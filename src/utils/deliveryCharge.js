/**
 * Delivery Charge Utility
 * Calculates delivery charges based on city and pincode
 * 
 * Rules:
 * - Bathinda (local): ₹50
 * - Other cities: ₹250
 */

// Bathinda pincode ranges (151001 - 151509)
const BATHINDA_PINCODE_PREFIX = '151';

// Common spelling variations of Bathinda
const BATHINDA_VARIANTS = [
  'bathinda',
  'bhatinda',
  'bathindha',
  'bhatindha',
  'bathinda city',
  'bhatinda city',
  'btd',
];

// Delivery charge constants
export const DELIVERY_CHARGES = {
  LOCAL: 50,      // Bathinda
  OUTSTATION: 250, // Other cities
};

/**
 * Normalize city name for comparison
 * @param {string} city - City name to normalize
 * @returns {string} - Normalized city name
 */
const normalizeCity = (city) => {
  if (!city) return '';
  return city.trim().toLowerCase().replace(/\s+/g, ' ');
};

/**
 * Check if the city is Bathinda based on name
 * @param {string} city - City name
 * @returns {boolean}
 */
const isBathindaByName = (city) => {
  const normalized = normalizeCity(city);
  return BATHINDA_VARIANTS.some((variant) => normalized === variant || normalized.includes(variant));
};

/**
 * Check if the pincode belongs to Bathinda
 * @param {string} pincode - Pincode
 * @returns {boolean}
 */
const isBathindaByPincode = (pincode) => {
  if (!pincode) return false;
  const trimmed = pincode.trim();
  return trimmed.startsWith(BATHINDA_PINCODE_PREFIX) && trimmed.length === 6;
};

/**
 * Calculate delivery charge based on city and pincode
 * @param {string} city - City name
 * @param {string} pincode - Pincode (optional, used as fallback)
 * @returns {{ charge: number, isLocal: boolean, message: string }}
 */
export const calculateDeliveryCharge = (city, pincode = '') => {
  const isBathinda = isBathindaByName(city) || isBathindaByPincode(pincode);

  if (isBathinda) {
    return {
      charge: DELIVERY_CHARGES.LOCAL,
      isLocal: true,
      message: `Local delivery (Bathinda): ₹${DELIVERY_CHARGES.LOCAL}`,
    };
  }

  // If city is entered but not Bathinda
  if (city && city.trim().length > 0) {
    return {
      charge: DELIVERY_CHARGES.OUTSTATION,
      isLocal: false,
      message: `Outstation delivery: ₹${DELIVERY_CHARGES.OUTSTATION}`,
    };
  }

  // No city entered yet - return 0 charge (will be calculated when city is entered)
  return {
    charge: 0,
    isLocal: null,
    message: '',
  };
};

/**
 * Check if city/pincode combination suggests Bathinda
 * @param {string} city - City name
 * @param {string} pincode - Pincode
 * @returns {boolean}
 */
export const isBathindaLocation = (city, pincode = '') => {
  return isBathindaByName(city) || isBathindaByPincode(pincode);
};
