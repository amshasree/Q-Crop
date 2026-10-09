import React from 'react';
import { StatusBadge } from './StatusBadge';

export const Badge = ({ variant = 'emerald', ...props }) => {
  // Map legacy color names to StatusBadge variants
  const variantMap = {
    emerald: 'success',
    cyan: 'info',
    purple: 'info',
    amber: 'warning',
    rose: 'warning',
    slate: 'neutral'
  };

  return <StatusBadge variant={variantMap[variant] || variant} {...props} />;
};

export default Badge;
