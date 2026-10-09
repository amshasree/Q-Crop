/**
 * Formatting utilities for Quantum Farming platform
 */

// Formats yield numbers to fixed decimals with standard unit
export const formatYield = (val, unit = 't/ha') => {
  if (val === null || val === undefined) return 'N/A';
  return `${Number(val).toFixed(2)} ${unit}`;
};

// Formats percentage values
export const formatPercentage = (val, decimals = 1) => {
  if (val === null || val === undefined) return '0%';
  const num = Number(val);
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(decimals)}%`;
};

// Formats quantum circuit fidelity scores
export const formatFidelity = (score) => {
  if (score === null || score === undefined) return '0.00%';
  return `${(Number(score) * 100).toFixed(2)}%`;
};

// Formats large numbers with commas
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

// Formats currency values
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Capitalize string
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
