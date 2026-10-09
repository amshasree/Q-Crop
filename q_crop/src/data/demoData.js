/**
 * Farmer Advisory Sample Demo Data (Quantum Farming)
 * Note: All metrics are sample illustrative values for frontend demonstration.
 */

// Today's Farmer Advisory Tasks (Sample Data)
export const TODAY_FARMER_TASKS = [
  {
    id: 'TASK-1',
    title: 'Apply 25% Nitrogen Top-Dressing',
    crop: 'Wheat (गेहूं)',
    priority: 'High',
    due: 'Today Morning',
    description: 'Crown Root Initiation (CRI) stage requires first split nitrogen dose for root branching.'
  },
  {
    id: 'TASK-2',
    title: 'Check Field Soil Moisture',
    crop: 'Wheat (गेहूं)',
    priority: 'Medium',
    due: 'Today Evening',
    description: 'Verify sub-surface soil moisture before scheduling tomorrow morning irrigation.'
  },
  {
    id: 'TASK-3',
    title: 'Inspect Field Borders for Yellow Rust',
    crop: 'Wheat (गेहूं)',
    priority: 'Low',
    due: 'Tomorrow',
    description: 'Check lower leaf canopy for yellow pustule spots during cool humid morning hours.'
  }
];

// Sample Weather Advisory Summary
export const MOCK_WEATHER_SUMMARY = {
  location: 'Punjab / Haryana (Indo-Gangetic Plain)',
  temperature: '22°C',
  humidity: '58%',
  rainfallForecast: 'No rain expected (Clear Sky)',
  season: 'Rabi Winter Season',
  windSpeed: '12 km/h NE',
  dataLabel: 'Sample Demo Weather (Not Live IMD Feed)'
};

// Sample Active Crop Growth Status
export const MOCK_CROP_GROWTH_STATUS = {
  cropName: 'Wheat (गेहूं)',
  growthStage: 'Tillering & Crown Root Stage',
  daysPlanted: 'Day 25 of 120',
  progressPercent: 21,
  healthIndex: 'Optimal Growth (Sample)',
  estimatedHarvest: '4.8 t/ha (~19 Q/acre)',
  irrigationStatus: 'Irrigation Due: Tomorrow Morning',
  pestRiskLevel: 'Low (Yellow Rust < 3%)',
  dataLabel: 'Sample Demo Agronomic Status'
};

// KPI Stats for Farmer Dashboard
export const DEMO_KPI_STATS = {
  cropsSupported: 5,
  cropsList: 'Paddy, Wheat, Maize, Cotton, Sugarcane',
  demoPredictionsCount: 142,
  illustrativeAvgYield: '4.8 t/ha (19 Q/acre)',
  engineStatus: 'Demo Mode (Sample Data)'
};

// Bar chart comparing sample yields (t/ha)
export const ILLUSTRATIVE_CROP_YIELDS = [
  { crop: 'Paddy (Rice)', baseline: 4.2, simulatedQuantum: 4.8, unit: 't/ha' },
  { crop: 'Wheat', baseline: 3.8, simulatedQuantum: 4.4, unit: 't/ha' },
  { crop: 'Maize', baseline: 5.5, simulatedQuantum: 6.2, unit: 't/ha' },
  { crop: 'Cotton', baseline: 2.2, simulatedQuantum: 2.6, unit: 't/ha' },
  { crop: 'Sugarcane', baseline: 68.0, simulatedQuantum: 76.0, unit: 't/ha' }
];

// Crop area distribution in sample farm clusters
export const CROP_DISTRIBUTION_DATA = [
  { name: 'Paddy (Rice)', share: 32, hectares: '48,000 ha', color: '#123D2A' },
  { name: 'Wheat', share: 28, hectares: '42,000 ha', color: '#26734D' },
  { name: 'Maize', share: 18, hectares: '27,000 ha', color: '#5B8C6E' },
  { name: 'Cotton', share: 14, hectares: '21,000 ha', color: '#84B892' },
  { name: 'Sugarcane', share: 8, hectares: '12,000 ha', color: '#A3D977' }
];

// Sample seasonal rainfall trend
export const SEASONAL_RAINFALL_TREND = [
  { month: 'Jan', rainfall: 35, avgTemp: 14 },
  { month: 'Feb', rainfall: 25, avgTemp: 18 },
  { month: 'Mar', rainfall: 20, avgTemp: 23 },
  { month: 'Apr', rainfall: 15, avgTemp: 29 },
  { month: 'May', rainfall: 40, avgTemp: 34 },
  { month: 'Jun', rainfall: 165, avgTemp: 32 },
  { month: 'Jul', rainfall: 280, avgTemp: 30 },
  { month: 'Aug', rainfall: 240, avgTemp: 29 },
  { month: 'Sep', rainfall: 150, avgTemp: 28 },
  { month: 'Oct', rainfall: 55, avgTemp: 26 },
  { month: 'Nov', rainfall: 20, avgTemp: 20 },
  { month: 'Dec', rainfall: 15, avgTemp: 15 }
];

// Sample Field Demonstration Log
export const ANALYTICS_SAMPLE_RECORDS = [
  { id: 'REC-001', crop: 'Wheat', region: 'Indo-Gangetic Plain (Punjab/Haryana)', season: 'Rabi', rainfall: 450, temperature: 19, humidity: 60, soilPh: 6.8, nitrogen: 120, illustrativeYield: 4.5, baselineYield: 4.0 },
  { id: 'REC-002', crop: 'Paddy (Rice)', region: 'Indo-Gangetic Plain (UP/Bihar)', season: 'Kharif', rainfall: 1100, temperature: 29, humidity: 80, soilPh: 6.5, nitrogen: 110, illustrativeYield: 4.8, baselineYield: 4.2 },
  { id: 'REC-003', crop: 'Maize', region: 'Deccan Plateau (Karnataka/AP)', season: 'Kharif', rainfall: 650, temperature: 27, humidity: 65, soilPh: 6.2, nitrogen: 130, illustrativeYield: 6.1, baselineYield: 5.4 },
  { id: 'REC-004', crop: 'Cotton', region: 'Deccan Plateau (Maharashtra/MP)', season: 'Kharif', rainfall: 750, temperature: 30, humidity: 55, soilPh: 7.4, nitrogen: 95, illustrativeYield: 2.6, baselineYield: 2.2 },
  { id: 'REC-005', crop: 'Sugarcane', region: 'Indo-Gangetic Plain (UP)', season: 'Annual', rainfall: 1250, temperature: 28, humidity: 70, soilPh: 7.0, nitrogen: 200, illustrativeYield: 74.0, baselineYield: 66.0 }
];

// Recent demo calculations table
export const RECENT_DEMO_ACTIVITIES = [
  {
    id: 'FARM-101',
    crop: 'Wheat (गेहूं)',
    region: 'Indo-Gangetic Plain (Punjab)',
    inputs: 'Moisture 45%, Nitrogen 120 kg/ha',
    illustrativeYield: '4.5 t/ha (18 Q/acre)',
    timestamp: '15 mins ago',
    status: 'Sample Calculation'
  },
  {
    id: 'FARM-102',
    crop: 'Paddy (धान)',
    region: 'Deccan Plateau (Telangana)',
    inputs: 'Moisture 70%, Nitrogen 110 kg/ha',
    illustrativeYield: '4.8 t/ha (19 Q/acre)',
    timestamp: '35 mins ago',
    status: 'Sample Calculation'
  },
  {
    id: 'FARM-103',
    crop: 'Cotton (कपास)',
    region: 'Deccan Plateau (Maharashtra)',
    inputs: 'Moisture 40%, Nitrogen 90 kg/ha',
    illustrativeYield: '2.5 t/ha (10 Q/acre)',
    timestamp: '1 hour ago',
    status: 'Sample Calculation'
  }
];

// Farmer Quick Action Cards
export const QUICK_ACTIONS_CONFIG = [
  {
    id: 'predict',
    title: 'Crop Yield Calculator',
    description: 'Calculate expected crop output based on soil nitrogen, rainfall, and season parameters.',
    path: '/predict',
    buttonText: 'Calculate Yield',
    icon: 'Calculator'
  },
  {
    id: 'insights',
    title: 'Crop Advisory & Care',
    description: 'Practical farming advice for Paddy, Wheat, Maize, Cotton, and Sugarcane.',
    path: '/crop-insights',
    buttonText: 'View Crop Guide',
    icon: 'Sprout'
  },
  {
    id: 'analytics',
    title: 'Rainfall & Yield Trends',
    description: 'Compare regional crop yields and seasonal monsoon rainfall trends.',
    path: '/analytics',
    buttonText: 'View Charts',
    icon: 'BarChart3'
  },
  {
    id: 'quantum',
    title: 'Science Behind Platform',
    description: 'Understand how computer models process weather and soil data to assist farmers.',
    path: '/quantum-tech',
    buttonText: 'Learn How It Works',
    icon: 'Atom'
  }
];
