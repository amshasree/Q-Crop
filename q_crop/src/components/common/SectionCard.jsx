import React from 'react';

export const SectionCard = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  className = '',
  headerBorder = true
}) => {
  return (
    <div
      className={`bg-white rounded-xl p-5 border border-[#E0E8E1] shadow-sm transition-shadow duration-150 ${className}`}
    >
      {(title || Icon || action) && (
        <div
          className={`flex items-center justify-between pb-3 ${
            headerBorder ? 'border-b border-[#E0E8E1] mb-4' : 'mb-2'
          }`}
        >
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-[#F5F8F4] text-[#123D2A] border border-[#E0E8E1]">
                <Icon className="w-4 h-4 shrink-0" />
              </div>
            )}
            <div>
              {title && <h3 className="text-base font-semibold text-[#172B22] tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-[#718078] mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionCard;
