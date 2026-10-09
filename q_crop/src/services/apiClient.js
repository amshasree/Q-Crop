/**
 * Centralized API Client Module for Quantum Farming
 * Configured via Vite Environment Variable VITE_API_BASE_URL
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export class ApiError extends Error {
  constructor(message, status = 503, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Generic HTTP Fetch wrapper
 * @param {string} endpoint 
 * @param {RequestInit} [options] 
 * @returns {Promise<any>}
 */
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `Server error HTTP ${response.status}`;
      let errorDetails = null;

      try {
        const errorJson = await response.json();
        errorMessage = errorJson.message || errorJson.detail || errorMessage;
        errorDetails = errorJson;
      } catch (e) {
        // Fallback for non-JSON error bodies
      }

      throw new ApiError(errorMessage, response.status, errorDetails);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    // Handle Network Disconnection / Connection Refused / 503
    throw new ApiError(
      'Backend prediction API service is currently unavailable or un-reachable.',
      503,
      { originalError: err.message }
    );
  }
};
