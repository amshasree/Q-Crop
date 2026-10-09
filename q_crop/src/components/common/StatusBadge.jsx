import React from 'react';

export const StatusBadge = ({
  children,
  variant = 'success', // 'success' | 'warning' | 'info' | 'neutral' | 'lime'
  size = 'md',
  icon: Icon,
  className = ''
}) => {
  const variants = {
    success: 'bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]',
    warning: 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]',
    info: 'bg-[#E3F2FD] text-[#0D47A1] border-[#BBDEFB]',
    neutral: 'bg-[#F5F8F4] text-[#4A5D54] border-[#E0E8E1]',
    lime: 'bg-[#F1F8EC] text-[#123D2A] border-[#A3D977]'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs font-medium'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${variants[variant] || variants.success} ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default StatusBadge;
