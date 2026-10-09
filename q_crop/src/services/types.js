/**
 * Typed-by-Convention JSDoc Data Contracts for Quantum Farming API
 */

/**
 * @typedef {Object} PredictionRequestPayload
 * @property {'Rice'|'Wheat'|'Maize'|'Cotton'} cropType Target crop name
 * @property {string} region Agricultural zone or region name
 * @property {string} growingSeason Season (e.g. Spring, Summer, Kharif, Rabi)
 * @property {string} irrigation Irrigation availability method
 * @property {number} rainfall Seasonal rainfall in millimeters (0 - 3000)
 * @property {number} temperature Average seasonal temperature in °C (-10 - 60)
 * @property {number} humidity Relative humidity percentage (0 - 100)
 * @property {number} soilPh Soil pH level (0.0 - 14.0)
 * @property {number} soilNitrogen Soil Nitrogen level in kg/ha (0 - 500)
 * @property {number} [circuitDepth] Optional VQE circuit depth parameter
 * @property {string} [quantumBackend] Target QPU backend ID
 */

/**
 * @typedef {Object} PredictionResponseData
 * @property {number} predictedYield Estimated harvest yield in tonnes per hectare (t/ha)
 * @property {number} confidenceScore Confidence percentage (0.0 - 100.0%)
 * @property {number} lowerBound Lower confidence limit in t/ha
 * @property {number} upperBound Upper confidence limit in t/ha
 * @property {string} cropCondition Evaluated crop health condition
 * @property {string} recommendations Agronomic optimization recommendation text
 * @property {string} modelVersion Backend model version string
 * @property {string} timestamp Server execution timestamp
 */

/**
 * @typedef {Object} BackendHealthStatus
 * @property {'HEALTHY'|'UNAVAILABLE'|'DEGRADED'} classicalMlStatus Status of Classical ML engine
 * @property {'UNAVAILABLE'|'SIMULATED'|'QPU_ONLINE'} quantumMlStatus Status of QPU / Quantum simulation engine
 * @property {string} version Backend API version
 * @property {string} timestamp Server ISO timestamp
 */

export const SERVICE_STATUS = {
  UNAVAILABLE: 'UNAVAILABLE',
  HEALTHY: 'HEALTHY',
  DEGRADED: 'DEGRADED',
  SIMULATED: 'SIMULATED'
};
