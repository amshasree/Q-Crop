/**
 * Utility module for local storage persistence of Farmer Profile data.
 * Explains and enforces device-only LocalStorage for offline/privacy-conscious prototyping.
 */

export const FARM_STORAGE_KEY = 'q_farming_my_farm_profile';

export const DEFAULT_FARM_PROFILE = {
  state: 'Punjab',
  district: 'Ludhiana',
  villageOrPin: 'Village - Model Town (PIN: 141001)',
  farmArea: '4.5',
  areaUnit: 'Acres', // Acres, Hectares, Bigha, Guntha
  soilType: 'Alluvial Loam',
  irrigationMethod: 'Canal Irrigation',
  crop: 'Wheat (गेहूं)',
  variety: 'HD-2967',
  sowingDate: '2026-11-05',
  growthStage: 'Vegetative / CRI Stage'
};

/**
 * Retrieves the saved farm profile from local browser storage.
 * Returns null if no profile exists.
 */
export const getFarmProfile = () => {
  try {
    const raw = localStorage.getItem(FARM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading farm profile from localStorage:', err);
    return null;
  }
};

/**
 * Saves or updates the farm profile in local browser storage.
 */
export const saveFarmProfile = (profileData) => {
  try {
    const payload = {
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(FARM_STORAGE_KEY, JSON.stringify(payload));
    return { success: true };
  } catch (err) {
    console.error('Error saving farm profile to localStorage:', err);
    return { success: false, error: 'Could not save profile to local storage.' };
  }
};

/**
 * Clears the farm profile from local browser storage.
 */
export const clearFarmProfile = () => {
  try {
    localStorage.removeItem(FARM_STORAGE_KEY);
    return { success: true };
  } catch (err) {
    console.error('Error clearing farm profile:', err);
    return { success: false };
  }
};

/**
 * Checks whether a saved profile exists.
 */
export const hasFarmProfile = () => {
  const profile = getFarmProfile();
  return profile !== null;
};

/**
 * Helper to convert area between Indian units for display.
 */
export const convertFarmArea = (value, unit) => {
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) return '';

  switch (unit) {
    case 'Acres':
      return `~ ${(num * 0.4047).toFixed(2)} Hectares (${(num * 4.84).toFixed(1)} Bigha)`;
    case 'Hectares':
      return `~ ${(num * 2.471).toFixed(2)} Acres (${(num * 11.96).toFixed(1)} Bigha)`;
    case 'Bigha':
      return `~ ${(num * 0.2066).toFixed(2)} Acres (${(num * 0.0836).toFixed(2)} Hectares)`;
    case 'Guntha':
      return `~ ${(num * 0.025).toFixed(2)} Acres (${(num * 0.0101).toFixed(3)} Hectares)`;
    default:
      return '';
  }
};
