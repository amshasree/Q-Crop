/**
 * Weather Service Module for Quantum Farming Kisan Platform.
 * Supports configurable API endpoint via VITE_WEATHER_API_URL environment variable.
 * Operates in sample data mode until live API is connected.
 */

const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL || '';

export const POPULAR_FARM_LOCATIONS = [
  { id: 'ludhiana', name: 'Ludhiana, Punjab', region: 'North India (Indo-Gangetic Plain)' },
  { id: 'karnal', name: 'Karnal, Haryana', region: 'North India' },
  { id: 'lucknow', name: 'Lucknow, Uttar Pradesh', region: 'Central UP' },
  { id: 'nashik', name: 'Nashik, Maharashtra', region: 'Western India' },
  { id: 'indore', name: 'Indore, Madhya Pradesh', region: 'Central India' },
  { id: 'rajkot', name: 'Rajkot, Gujarat', region: 'Western India' },
  { id: 'bathinda', name: 'Bathinda, Punjab', region: 'Malwa Belt' },
  { id: 'hisar', name: 'Hisar, Haryana', region: 'North-Western India' }
];

/**
 * MOCK SAMPLE WEATHER DATA MATRIX BY LOCATION
 */
const MOCK_WEATHER_DATA = {
  'Ludhiana, Punjab': {
    temperature: 24,
    feelsLike: 25,
    condition: 'Partly Cloudy (आंशिक बादल)',
    humidity: 58,
    rainfallAmount: 0.0,
    rainfallChance: 15,
    windSpeed: 12,
    windDirection: 'NW (उत्तर-पश्चिम)',
    uvIndex: 'Moderate (5)',
    forecast: [
      { day: 'Today', date: 'Oct 10', highTemp: 26, lowTemp: 16, condition: 'Partly Cloudy', rainChance: 15, rainAmount: 0, humidity: 58, windSpeed: 12, iconName: 'CloudSun' },
      { day: 'Tomorrow', date: 'Oct 11', highTemp: 24, lowTemp: 15, condition: 'Light Rain (हल्की बारिश)', rainChance: 70, rainAmount: 12.5, humidity: 75, windSpeed: 18, iconName: 'CloudRain' },
      { day: 'Saturday', date: 'Oct 12', highTemp: 23, lowTemp: 14, condition: 'Moderate Rain (मध्यम बारिश)', rainChance: 85, rainAmount: 25.0, humidity: 82, windSpeed: 22, iconName: 'CloudRain' },
      { day: 'Sunday', date: 'Oct 13', highTemp: 25, lowTemp: 15, condition: 'Sunny / Clear (साफ़ मौसम)', rainChance: 10, rainAmount: 0, humidity: 50, windSpeed: 10, iconName: 'Sun' },
      { day: 'Monday', date: 'Oct 14', highTemp: 27, lowTemp: 17, condition: 'Clear Sky (साफ़ आसमान)', rainChance: 5, rainAmount: 0, humidity: 48, windSpeed: 9, iconName: 'Sun' }
    ]
  },
  'Karnal, Haryana': {
    temperature: 25,
    feelsLike: 26,
    condition: 'Sunny & Mild (सुहावना मौसम)',
    humidity: 52,
    rainfallAmount: 0.0,
    rainfallChance: 10,
    windSpeed: 10,
    windDirection: 'W (पश्चिम)',
    uvIndex: 'High (6)',
    forecast: [
      { day: 'Today', date: 'Oct 10', highTemp: 27, lowTemp: 17, condition: 'Sunny & Mild', rainChance: 10, rainAmount: 0, humidity: 52, windSpeed: 10, iconName: 'Sun' },
      { day: 'Tomorrow', date: 'Oct 11', highTemp: 25, lowTemp: 16, condition: 'Passing Clouds', rainChance: 30, rainAmount: 2.0, humidity: 62, windSpeed: 14, iconName: 'CloudSun' },
      { day: 'Saturday', date: 'Oct 12', highTemp: 24, lowTemp: 15, condition: 'Light Thunderstorm', rainChance: 65, rainAmount: 15.0, humidity: 78, windSpeed: 20, iconName: 'CloudRain' },
      { day: 'Sunday', date: 'Oct 13', highTemp: 26, lowTemp: 16, condition: 'Clear Sky', rainChance: 5, rainAmount: 0, humidity: 52, windSpeed: 11, iconName: 'Sun' },
      { day: 'Monday', date: 'Oct 14', highTemp: 28, lowTemp: 18, condition: 'Sunny', rainChance: 5, rainAmount: 0, humidity: 45, windSpeed: 8, iconName: 'Sun' }
    ]
  }
};

/**
 * Fetches weather data for a given location.
 * Uses real API if VITE_WEATHER_API_URL is configured, else returns sample data.
 */
export const fetchWeatherData = async (location = 'Ludhiana, Punjab') => {
  // Simulate network delay for realistic UI loading test
  await new Promise((res) => setTimeout(res, 600));

  // If live API URL is configured, attempt real fetch
  if (WEATHER_API_URL && WEATHER_API_URL.trim() !== '') {
    try {
      const response = await fetch(`${WEATHER_API_URL}/weather?location=${encodeURIComponent(location)}`);
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          isLive: true,
          status: 'live_api',
          location: data.location || location,
          updatedAt: 'Live API Feed',
          current: data.current,
          forecast: data.forecast,
          farmingImplications: data.farmingImplications || []
        };
      }
    } catch (err) {
      console.warn('Live weather API fetch failed, falling back to sample mode:', err);
    }
  }

  // Sample data fallback (Explicitly marked non-live)
  const mockLoc = MOCK_WEATHER_DATA[location] || MOCK_WEATHER_DATA['Ludhiana, Punjab'];

  const rainSum = mockLoc.forecast.slice(1, 3).reduce((acc, cur) => acc + cur.rainAmount, 0);

  const implications = [
    {
      id: 1,
      category: 'Irrigation Planning (सिंचाई सलाह)',
      title: rainSum > 10 ? 'Pause Irrigation Due to Upcoming Rain' : 'Normal Irrigation Schedule',
      advice: rainSum > 10
        ? `Forecast indicates ~${rainSum.toFixed(1)} mm rainfall in next 48 hours. Postpone canal/tube well watering to avoid waterlogging.`
        : 'Low rainfall probability. Proceed with scheduled light field irrigation as per soil moisture.',
      type: rainSum > 10 ? 'caution' : 'info'
    },
    {
      id: 2,
      category: 'Spraying & Field Operations (छिड़काव सलाह)',
      title: 'Wind Speed & Rain Spray Hazard Notice',
      advice: 'Avoid foliar sprays during rain or when wind speed exceeds 15 km/h to prevent chemical wash-off and spray drift.',
      type: 'warning'
    },
    {
      id: 3,
      category: 'Harvest & Post-Harvest Protection (कटाई व भंडारण)',
      title: 'Store Harvested Grain in Dry Sheds',
      advice: 'Ensure harvested crop heaps are stored in dry covered structures or protected with waterproof plastic tarpaulins.',
      type: 'info'
    }
  ];

  return {
    success: true,
    isLive: false,
    status: 'sample_data_mode',
    location: location,
    updatedAt: 'Today, 08:00 AM (Sample Benchmark Data)',
    current: {
      temperature: mockLoc.temperature,
      feelsLike: mockLoc.feelsLike,
      condition: mockLoc.condition,
      humidity: mockLoc.humidity,
      rainfallAmount: mockLoc.rainfallAmount,
      rainfallChance: mockLoc.rainfallChance,
      windSpeed: mockLoc.windSpeed,
      windDirection: mockLoc.windDirection,
      uvIndex: mockLoc.uvIndex
    },
    forecast: mockLoc.forecast,
    farmingImplications: implications
  };
};
