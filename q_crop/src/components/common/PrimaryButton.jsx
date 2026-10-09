import React from 'react';
import { Loader2 } from 'lucide-react';

export const PrimaryButton = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'lime' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#26734D] focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-[#123D2A] hover:bg-[#195038] text-white border border-[#123D2A] shadow-sm',
    secondary: 'bg-[#26734D] hover:bg-[#1e5a3c] text-white border border-[#26734D] shadow-sm',
    lime: 'bg-[#A3D977] hover:bg-[#93cb65] text-[#172B22] font-semibold border border-[#92cb64] shadow-sm',
    outline: 'bg-white hover:bg-[#F5F8F4] text-[#123D2A] border border-[#E0E8E1] hover:border-[#26734D]',
    ghost: 'bg-transparent hover:bg-[#E8F0EA] text-[#172B22]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm font-semibold gap-2.5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default PrimaryButton;
