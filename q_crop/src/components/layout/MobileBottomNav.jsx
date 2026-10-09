import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Tractor,
  CloudSun,
  Sprout,
  IndianRupee
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MobileBottomNav = () => {
  const { t } = useLanguage();

  const navs = [
    { name: t('dashboard'), path: '/', icon: LayoutDashboard },
    { name: t('myFarm'), path: '/my-farm', icon: Tractor },
    { name: t('weather'), path: '/weather', icon: CloudSun },
    { name: t('cropAdvisor'), path: '/crop-insights', icon: Sprout },
    { name: t('marketPrices'), path: '/market-prices', icon: IndianRupee }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E0E8E1] lg:hidden shadow-lg print:hidden">
      <div className="flex items-center justify-around h-16 px-1">
        {navs.map((nav) => {
          const Icon = nav.icon;
          return (
            <NavLink
              key={nav.path}
              to={nav.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full min-h-[48px] py-1 px-1 transition-colors text-[10px] font-bold ${
                  isActive
                    ? 'text-[#123D2A] border-t-2 border-[#26734D] bg-[#F1F8EC]/60'
                    : 'text-[#718078] hover:text-[#172B22]'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5 shrink-0" />
              <span className="truncate max-w-[64px] text-center leading-none">{nav.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
