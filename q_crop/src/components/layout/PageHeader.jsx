import React from 'react';
import { ChevronRight } from 'lucide-react';

export const PageHeader = ({
  title,
  subtitle,
  description,
  breadcrumb,
  actions,
  icon: Icon,
  className = ''
}) => {
  const subText = subtitle || description;

  return (
    <div className={`border-b border-[#E0E8E1] pb-4 mb-6 ${className}`}>
      {/* Breadcrumbs if provided */}
      {breadcrumb && (
        <nav className="flex items-center space-x-1.5 text-xs text-[#718078] mb-2 font-medium">
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3 h-3 text-[#718078]" />}
                <span className={index === breadcrumb.length - 1 ? 'text-[#123D2A] font-semibold' : ''}>
                  {item}
                </span>
              </React.Fragment>
            ))
          ) : (
            <span>{breadcrumb}</span>
          )}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            {Icon && (
              <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#123D2A] border border-[#C8E6C9]">
                <Icon className="w-5 h-5 shrink-0" />
              </div>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-[#172B22] tracking-tight">
              {title}
            </h1>
          </div>
          {subText && (
            <p className="text-xs sm:text-sm text-[#718078] mt-1 font-normal leading-relaxed">
              {subText}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center space-x-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
