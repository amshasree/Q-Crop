import React from 'react';
import { Sprout } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

export const EmptyState = ({
  title = 'No Data Available',
  description = 'There are currently no records or predictions to display for this view.',
  icon: Icon = Sprout,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`bg-white rounded-xl p-8 border border-[#E0E8E1] text-center flex flex-col items-center justify-center space-y-3 shadow-sm ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#F5F8F4] border border-[#E0E8E1] flex items-center justify-center text-[#26734D]">
        <Icon className="w-6 h-6" />
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-base font-semibold text-[#172B22]">{title}</h3>
        <p className="text-xs text-[#718078] leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <PrimaryButton variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
