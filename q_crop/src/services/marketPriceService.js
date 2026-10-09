/**
 * Market Price Service Module for Indian Mandi Prices.
 * Interface ready for Agmarknet / e-NAM API integration via VITE_MARKET_PRICE_API_URL.
 * Operates in sample data mode until live API is connected.
 */

const MARKET_API_URL = import.meta.env.VITE_MARKET_PRICE_API_URL || '';

export const SAMPLE_MARKET_PRICES = [
  {
    id: 'mp-1',
    crop: 'Wheat (गेहूं)',
    variety: 'HD-2967 (Dara)',
    state: 'Punjab',
    district: 'Ludhiana',
    market: 'Khanna Grain Market',
    minPrice: 2225,
    maxPrice: 2350,
    modalPrice: 2275,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 09:30 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  },
  {
    id: 'mp-2',
    crop: 'Wheat (गेहूं)',
    variety: 'PBW-343',
    state: 'Punjab',
    district: 'Bathinda',
    market: 'Bathinda APMC Mandi',
    minPrice: 2200,
    maxPrice: 2320,
    modalPrice: 2260,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 09:15 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  },
  {
    id: 'mp-3',
    crop: 'Wheat (गेहूं)',
    variety: 'Sharbati',
    state: 'Madhya Pradesh',
    district: 'Indore',
    market: 'Indore Mandi',
    minPrice: 2700,
    maxPrice: 3100,
    modalPrice: 2880,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 10:00 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  },
  {
    id: 'mp-4',
    crop: 'Paddy / Rice (धान)',
    variety: 'PR-126',
    state: 'Punjab',
    district: 'Ludhiana',
    market: 'Ludhiana Main Market',
    minPrice: 2250,
    maxPrice: 2380,
    modalPrice: 2320,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 09:45 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  },
  {
    id: 'mp-5',
    crop: 'Paddy / Rice (धान)',
    variety: 'Pusa Basmati 1121',
    state: 'Haryana',
    district: 'Karnal',
    market: 'Karnal Grain Market',
    minPrice: 3800,
    maxPrice: 4350,
    modalPrice: 4100,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 09:30 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  },
  {
    id: 'mp-6',
    crop: 'Maize (मक्का)',
    variety: 'Yellow Hybrid',
    state: 'Bihar',
    district: 'Purnia',
    market: 'Gulabbagh Mandi',
    minPrice: 2100,
    maxPrice: 2280,
    modalPrice: 2210,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 08:30 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  },
  {
    id: 'mp-7',
    crop: 'Cotton (कपास)',
    variety: 'Medium Staple (Bt)',
    state: 'Gujarat',
    district: 'Rajkot',
    market: 'Rajkot APMC',
    minPrice: 6800,
    maxPrice: 7350,
    modalPrice: 7120,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 10:15 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  },
  {
    id: 'mp-8',
    crop: 'Mustard (सरसों)',
    variety: 'Kala Sarson',
    state: 'Rajasthan',
    district: 'Bharatpur',
    market: 'Bharatpur Mandi',
    minPrice: 5200,
    maxPrice: 5650,
    modalPrice: 5450,
    unit: '₹ / Quintal',
    updatedAt: 'Today, 09:00 AM (Sample Entry)',
    source: 'Agmarknet Sample Benchmark'
  }
];

/**
 * Fetches market prices with optional filters.
 */
export const fetchMarketPrices = async (filters = {}) => {
  // Simulate network loading
  await new Promise((res) => setTimeout(res, 500));

  if (MARKET_API_URL && MARKET_API_URL.trim() !== '') {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${MARKET_API_URL}/prices?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          isLive: true,
          status: 'live_api',
          source: data.source || 'Live Agmarknet Feed',
          records: data.records || []
        };
      }
    } catch (err) {
      console.warn('Live market price fetch failed, falling back to sample mode:', err);
    }
  }

  // Filter sample data
  let filtered = [...SAMPLE_MARKET_PRICES];

  if (filters.crop && filters.crop !== 'All Crops') {
    filtered = filtered.filter((r) => r.crop.toLowerCase().includes(filters.crop.toLowerCase()));
  }

  if (filters.state && filters.state !== 'All States') {
    filtered = filtered.filter((r) => r.state.toLowerCase() === filters.state.toLowerCase());
  }

  if (filters.district && filters.district !== 'All Districts') {
    filtered = filtered.filter((r) => r.district.toLowerCase().includes(filters.district.toLowerCase()));
  }

  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.crop.toLowerCase().includes(q) ||
        r.market.toLowerCase().includes(q) ||
        r.variety.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q)
    );
  }

  return {
    success: true,
    isLive: false,
    status: 'sample_data_mode',
    source: 'Agmarknet Sample Benchmark Data',
    records: filtered
  };
};
