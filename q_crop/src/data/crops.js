/**
 * Practical Agronomic Advisory Data for Farmers in India
 * Note: These guidelines are general agronomic recommendations for educational assistance.
 */

export const CROPS_REFERENCE_DATA = [
  {
    id: 'rice',
    name: 'Paddy / Rice (धान)',
    category: 'Cereals & Food Grains',
    shortDescription: 'Major staple crop in India grown predominantly during the Kharif monsoon season.',
    growingConditions: 'Requires clayey or loams capable of holding water. Needs abundant sunshine and high humidity.',
    tempRange: '20°C - 35°C',
    tempMin: 20,
    tempMax: 35,
    rainfallRange: '1,000 - 1,800 mm',
    soilPhRange: '5.5 - 7.0 (Slightly Acidic to Neutral)',
    nitrogenRange: '100 - 120 kg/ha (NPK 120:60:60)',
    harvestWindow: '120 - 145 days after sowing',
    commonPests: 'Stem Borer, Leaf Folder, Brown Planthopper',
    irrigationType: 'Keep 3-5 cm standing water during tillering',
    iconName: 'Droplets',
    details: 'Ensure proper field leveling. Apply Nitrogen in 3 split doses: 50% at basal, 25% at tillering, and 25% at panicle initiation.'
  },
  {
    id: 'wheat',
    name: 'Wheat (गेहूं)',
    category: 'Cereals & Food Grains',
    shortDescription: 'Primary Rabi season winter crop grown across Indo-Gangetic plains of North India.',
    growingConditions: 'Thrives in cool winter weather during growth and warm dry weather during ripening. Well-drained loamy soil.',
    tempRange: '12°C - 25°C',
    tempMin: 12,
    tempMax: 25,
    rainfallRange: '450 - 750 mm',
    soilPhRange: '6.0 - 7.5 (Fertile Loam)',
    nitrogenRange: '120 - 150 kg/ha (NPK 120:60:40)',
    harvestWindow: '115 - 135 days after sowing',
    commonPests: 'Yellow Rust, Aphids, Termites',
    irrigationType: '5-6 irrigations at critical stages (Crown Root Initiation at 21 days is vital)',
    iconName: 'Sprout',
    details: 'First irrigation at Crown Root Initiation (CRI) stage (20-25 days after sowing) is most critical. Avoid waterlogging during seed germination.'
  },
  {
    id: 'maize',
    name: 'Maize / Corn (मक्का)',
    category: 'Cereals & Food Grains',
    shortDescription: 'Versatile cereal crop used for grain, fodder, and industrial starch production.',
    growingConditions: 'Requires warm weather, rich loamy soil with good drainage, and sunny days.',
    tempRange: '18°C - 32°C',
    tempMin: 18,
    tempMax: 32,
    rainfallRange: '500 - 800 mm',
    soilPhRange: '5.8 - 7.2',
    nitrogenRange: '120 - 150 kg/ha (NPK 120:60:50)',
    harvestWindow: '90 - 110 days',
    commonPests: 'Fall Armyworm, Stem Borer',
    irrigationType: 'Irrigate at knee-high stage, flowering, and grain filling',
    iconName: 'Sun',
    details: 'Maize cannot tolerate standing water. Ensure ridge planting during heavy monsoon rains to protect root systems.'
  },
  {
    id: 'cotton',
    name: 'Cotton (कपास)',
    category: 'Cash & Fiber Crops',
    shortDescription: 'Important commercial cash crop grown extensively in black cotton soils (Regur) of India.',
    growingConditions: 'Requires deep black clay soil or fertile alluvial soil, long warm summers, and clear sunny weather during boll picking.',
    tempRange: '21°C - 35°C',
    tempMin: 21,
    tempMax: 35,
    rainfallRange: '500 - 1,000 mm',
    soilPhRange: '6.5 - 8.0 (Deep Black Soil)',
    nitrogenRange: '90 - 120 kg/ha',
    harvestWindow: '150 - 180 days',
    commonPests: 'Pink Bollworm, Whitefly, Aphids',
    irrigationType: 'Alternate furrow irrigation at square formation & boll development',
    iconName: 'CloudSun',
    details: 'Monitor fields for Pink Bollworm using pheromone traps. Avoid heavy nitrogen application during peak flowering to prevent excessive vegetative growth.'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane (गन्ना)',
    category: 'Cash & Commercial Crops',
    shortDescription: 'Long-duration cash crop grown widely in Uttar Pradesh, Maharashtra, and Karnataka.',
    growingConditions: 'Requires hot humid climate, deep well-drained loamy soil, and regular irrigation water.',
    tempRange: '20°C - 38°C',
    tempMin: 20,
    tempMax: 38,
    rainfallRange: '1,200 - 1,500 mm',
    soilPhRange: '6.5 - 7.5',
    nitrogenRange: '150 - 250 kg/ha',
    harvestWindow: '10 - 14 months',
    commonPests: 'Early Shoot Borer, Red Rot, Pyrilla',
    irrigationType: 'Regular irrigation every 10-15 days in summer',
    iconName: 'Droplets',
    details: 'Trash mulching between crop rows conserves soil moisture and suppresses weed growth during hot summer months.'
  }
];

export const CROP_CATEGORIES = [
  'All Categories',
  'Cereals & Food Grains',
  'Cash & Commercial Crops'
];
