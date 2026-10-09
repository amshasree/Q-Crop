import { fetchApi, ApiError } from './apiClient';
import { SERVICE_STATUS } from './types';

/**
 * Validates prediction request payload on the client side before triggering API call
 * @param {import('./types').PredictionRequestPayload} payload 
 * @returns {{ isValid: boolean, errors: Object }}
 */
export const validatePredictionPayload = (payload) => {
  const errors = {};

  if (!payload.cropType) errors.cropType = 'Crop type is required.';
  if (!payload.region || !payload.region.trim()) errors.region = 'Region is required.';
  if (!payload.growingSeason) errors.growingSeason = 'Growing season is required.';
  if (!payload.irrigation) errors.irrigation = 'Irrigation status is required.';

  const rainfall = Number(payload.rainfall);
  if (isNaN(rainfall) || rainfall < 0 || rainfall > 3000) {
    errors.rainfall = 'Rainfall must be between 0 and 3,000 mm.';
  }

  const temp = Number(payload.temperature);
  if (isNaN(temp) || temp < -10 || temp > 60) {
    errors.temperature = 'Temperature must be between -10°C and 60°C.';
  }

  const humidity = Number(payload.humidity);
  if (isNaN(humidity) || humidity < 0 || humidity > 100) {
    errors.humidity = 'Humidity must be between 0% and 100%.';
  }

  const ph = Number(payload.soilPh);
  if (isNaN(ph) || ph < 0 || ph > 14) {
    errors.soilPh = 'Soil pH must be between 0.0 and 14.0.';
  }

  const nitrogen = Number(payload.soilNitrogen);
  if (isNaN(nitrogen) || nitrogen < 0 || nitrogen > 500) {
    errors.soilNitrogen = 'Soil Nitrogen must be between 0 and 500 kg/ha.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sends a yield prediction request to the future Python backend API
 * @param {import('./types').PredictionRequestPayload} payload 
 * @returns {Promise<{ success: boolean, status: string, data: import('./types').PredictionResponseData|null, error: string|null }>}
 */
export const predictCropYield = async (payload) => {
  // 1. Input Validation
  const validation = validatePredictionPayload(payload);
  if (!validation.isValid) {
    return {
      success: false,
      status: 'VALIDATION_ERROR',
      data: null,
      error: 'Input validation failed. Please check field errors.',
      validationErrors: validation.errors
    };
  }

  // 2. Execute HTTP POST request to future API endpoint
  try {
    const data = await fetchApi('/predict/yield', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      status: 'SUCCESS',
      data,
      error: null
    };
  } catch (err) {
    // Explicitly handle service connection / 503 error without fabricating predictions
    return {
      success: false,
      status: err.status === 503 ? SERVICE_STATUS.UNAVAILABLE : 'API_ERROR',
      data: null,
      error: err.message || 'Prediction service is currently unavailable.'
    };
  }
};

/**
 * Checks system status separating Classical ML and Quantum ML endpoints
 * @returns {Promise<import('./types').BackendHealthStatus>}
 */
export const checkBackendHealth = async () => {
  try {
    const data = await fetchApi('/health', { method: 'GET' });
    return {
      classicalMlStatus: data.classicalMlStatus || SERVICE_STATUS.HEALTHY,
      quantumMlStatus: data.quantumMlStatus || SERVICE_STATUS.UNAVAILABLE,
      version: data.version || '1.0.0-future',
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    // Standard un-connected status
    return {
      classicalMlStatus: SERVICE_STATUS.UNAVAILABLE,
      quantumMlStatus: SERVICE_STATUS.UNAVAILABLE,
      version: 'N/A (Disconnected)',
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Retrieves status of remote QPU nodes
 * @returns {Promise<Array<any>>}
 */
export const getQpuNodeStatus = async () => {
  try {
    return await fetchApi('/quantum/nodes', { method: 'GET' });
  } catch (err) {
    return [];
  }
};
