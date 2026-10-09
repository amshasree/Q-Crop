import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  unit,
  change,
  changeType = 'positive',
  subtitle,
  icon: Icon,
  className = ''
}) => {
  return (
    <div
      className={`bg-white rounded-xl p-5 border border-[#E0E8E1] shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-[#F5F8F4] text-[#123D2A] border border-[#E0E8E1]">
            <Icon className="w-4 h-4 shrink-0" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-1.5">
        <span className="text-2xl sm:text-3xl font-bold text-[#172B22] tracking-tight">{value}</span>
        {unit && <span className="text-xs font-medium text-[#718078]">{unit}</span>}
      </div>

      <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#F0F5F1] text-xs">
        {change !== undefined && (
          <div className="flex items-center space-x-1 font-medium">
            {changeType === 'positive' && (
              <span className="flex items-center text-[#1B5E20] bg-[#E8F5E9] px-1.5 py-0.5 rounded text-[11px] font-semibold border border-[#C8E6C9]">
                <TrendingUp className="w-3 h-3 mr-1" />
                {change}
              </span>
            )}
            {changeType === 'negative' && (
              <span className="flex items-center text-[#C62828] bg-[#FFEBEE] px-1.5 py-0.5 rounded text-[11px] font-semibold border border-[#FFCDD2]">
                <TrendingDown className="w-3 h-3 mr-1" />
                {change}
              </span>
            )}
            {changeType === 'neutral' && (
              <span className="flex items-center text-[#718078] bg-[#F5F8F4] px-1.5 py-0.5 rounded text-[11px] font-medium border border-[#E0E8E1]">
                <Minus className="w-3 h-3 mr-1" />
                {change}
              </span>
            )}
          </div>
        )}
        {subtitle && <span className="text-[#718078] truncate text-[11px]">{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
