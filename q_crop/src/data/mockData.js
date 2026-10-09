/**
 * Centralized Demo Data Module for Quantum Farming Platform
 */

export const CROPS_DATA = [
  { id: 'wheat', name: 'Winter Wheat', category: 'Cereals', baseYield: 4.2, unit: 't/ha', optimalMoisture: 45, optimalTemp: 21 },
  { id: 'corn', name: 'Field Corn', category: 'Grains', baseYield: 9.8, unit: 't/ha', optimalMoisture: 55, optimalTemp: 26 },
  { id: 'soybeans', name: 'Organic Soybeans', category: 'Legumes', baseYield: 3.5, unit: 't/ha', optimalMoisture: 50, optimalTemp: 24 },
  { id: 'rice', name: 'Basmati Rice', category: 'Grains', baseYield: 5.6, unit: 't/ha', optimalMoisture: 70, optimalTemp: 28 },
  { id: 'barley', name: 'Spring Barley', category: 'Cereals', baseYield: 4.8, unit: 't/ha', optimalMoisture: 42, optimalTemp: 19 },
  { id: 'cotton', name: 'Upland Cotton', category: 'Fiber', baseYield: 2.9, unit: 't/ha', optimalMoisture: 40, optimalTemp: 30 },
];

export const REGIONS_DATA = [
  { id: 'midwest', name: 'North American Corn Belt', soilType: 'Silt Loam', climateZone: 'Temperate' },
  { id: 'punjab', name: 'Indo-Gangetic Plain', soilType: 'Alluvial', climateZone: 'Subtropical' },
  { id: 'parana', name: 'Paraná Basin (Brazil)', soilType: 'Ferralsol', climateZone: 'Tropical Humid' },
  { id: 'danube', name: 'Danube Basin (Europe)', soilType: 'Chernozem', climateZone: 'Continental' },
  { id: 'murray', name: 'Murray-Darling (Australia)', soilType: 'Vertisol', climateZone: 'Arid/Semi-Arid' }
];

export const QUANTUM_BACKENDS = [
  { id: 'quantinuum_h2', name: 'Quantinuum H2 (Trapped-Ion)', qubits: 56, fidelity: '99.8%', status: 'Online', latency: '42ms' },
  { id: 'ibm_heron', name: 'IBM Quantum Heron r2', qubits: 133, fidelity: '99.4%', status: 'Online', latency: '18ms' },
  { id: 'ionq_aria', name: 'IonQ Aria (Barium Qubits)', qubits: 32, fidelity: '99.7%', status: 'Online', latency: '35ms' },
  { id: 'rigetti_ankaa', name: 'Rigetti Ankaa-3', qubits: 84, fidelity: '98.8%', status: 'Busy', latency: '65ms' },
  { id: 'simulator', name: 'State Vector Simulator (GPU)', qubits: 36, fidelity: '100%', status: 'Standby', latency: '5ms' }
];

// Historical yield prediction performance comparison (5 Years)
export const YIELD_TREND_DATA = [
  { year: '2022', actual: 4.1, classicalML: 3.85, quantumAI: 4.08, errorMargin: 0.12 },
  { year: '2023', actual: 4.35, classicalML: 4.05, quantumAI: 4.33, errorMargin: 0.08 },
  { year: '2024', actual: 4.6, classicalML: 4.22, quantumAI: 4.58, errorMargin: 0.05 },
  { year: '2025', actual: 4.82, classicalML: 4.38, quantumAI: 4.80, errorMargin: 0.04 },
  { year: '2026 (Est)', actual: 5.10, classicalML: 4.50, quantumAI: 5.08, errorMargin: 0.03 }
];

// Climate factor impact matrix on crop yield forecast
export const CLIMATE_IMPACT_DATA = [
  { factor: 'Soil Moisture', sensitivity: 92, quantumTensorWeight: 0.34, varianceImpact: '+18%' },
  { factor: 'Solar Irradiance', sensitivity: 84, quantumTensorWeight: 0.28, varianceImpact: '+14%' },
  { factor: 'Soil Nitrogen (N)', sensitivity: 78, quantumTensorWeight: 0.18, varianceImpact: '+12%' },
  { factor: 'Microbiome Index', sensitivity: 71, quantumTensorWeight: 0.12, varianceImpact: '+9%' },
  { factor: 'Diurnal Temp Range', sensitivity: 65, quantumTensorWeight: 0.08, varianceImpact: '+6%' }
];

// Feature Importance chart data (comparing Classical vs Quantum Shapley Values)
export const FEATURE_IMPORTANCE_DATA = [
  { feature: 'NDVI Index', classical: 62, quantum: 88 },
  { feature: 'Root Zone Moisture', classical: 54, quantum: 82 },
  { feature: 'Canopy Temp Anomaly', classical: 48, quantum: 79 },
  { feature: 'N-P-K Soil Ratio', classical: 70, quantum: 75 },
  { feature: 'VQE Climate Coupling', classical: 20, quantum: 94 }
];

// Regional comparison yield output
export const REGIONAL_YIELD_DATA = [
  { region: 'Corn Belt (USA)', wheat: 4.8, corn: 10.4, soy: 3.8 },
  { region: 'Indo-Gangetic', wheat: 4.1, corn: 6.8, soy: 2.9 },
  { region: 'Danube Basin', wheat: 5.4, corn: 8.9, soy: 3.4 },
  { region: 'Paraná Basin', wheat: 3.6, corn: 9.1, soy: 4.1 },
  { region: 'Murray-Darling', wheat: 3.2, corn: 5.5, soy: 2.2 }
];

// Crop Insights actionable recommendations
export const CROP_INSIGHTS = [
  {
    id: 1,
    crop: 'Winter Wheat',
    riskLevel: 'Low',
    pestRisk: 'Rust Fungus (< 4%)',
    optimalIrrigation: '18mm / 3 days',
    harvestWindow: 'June 14 - June 22',
    quantumRecommendation: 'Apply nitrogen top-dressing at Z32 stage. Quantum tensor model projects +12.4% yield boost under predicted June thermal stress.'
  },
  {
    id: 2,
    crop: 'Field Corn',
    riskLevel: 'Medium',
    pestRisk: 'Corn Borer (18%)',
    optimalIrrigation: '25mm / 2 days',
    harvestWindow: 'Sept 28 - Oct 10',
    quantumRecommendation: 'Sub-soil moisture coupling detected early stress risk. Increase potassium formulation by 8% to maximize kernel depth.'
  },
  {
    id: 3,
    crop: 'Organic Soybeans',
    riskLevel: 'Low',
    pestRisk: 'Aphid Swarm (< 2%)',
    optimalIrrigation: '15mm / 4 days',
    harvestWindow: 'Oct 05 - Oct 15',
    quantumRecommendation: 'Rhizobia nodulation efficiency at 94%. Quantum simulation predicts optimal protein content if harvested pre-frost.'
  }
];

// Platform System Overview Metrics
export const SYSTEM_STATS = {
  activeHectares: 1420500,
  yieldPredictionAccuracy: 98.6,
  quantumCircuitsExecuted: 485120,
  averageYieldGain: '+14.2%',
  co2OffsetTons: 64200,
  connectedFarms: 3840
};
