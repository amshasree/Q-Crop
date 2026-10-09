import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Tractor,
  IndianRupee,
  CloudSun,
  FlaskConical,
  Calculator,
  BarChart3,
  Sprout,
  Camera,
  Atom,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = ({ isOpen, closeSidebar }) => {
  const { t } = useLanguage();

  const navItems = [
    { name: t('dashboard'), path: '/', icon: LayoutDashboard },
    { name: t('myFarm'), path: '/my-farm', icon: Tractor, badge: 'Setup' },
    { name: 'Crop Photo Scanner', path: '/crop-image-analysis', icon: Camera, badge: 'AI Vision' },
    { name: t('marketPrices'), path: '/market-prices', icon: IndianRupee },
    { name: t('soilHealth'), path: '/soil-health', icon: FlaskConical },
    { name: t('weather'), path: '/weather', icon: CloudSun },
    { name: t('yieldPlanner'), path: '/predict', icon: Calculator, badge: 'Tool' },
    { name: 'Crop Trends & Weather', path: '/analytics', icon: BarChart3 },
    { name: t('cropAdvisor'), path: '/crop-insights', icon: Sprout, badge: 'Kisan' },
    { name: t('science'), path: '/quantum-tech', icon: Atom },
    { name: t('about'), path: '/about', icon: Info }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-[#172B22]/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 z-40 w-64 h-screen lg:h-[calc(100vh-61px)] bg-white border-r border-[#E0E8E1] transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col justify-between p-4 shadow-sm lg:shadow-none print:hidden`}
      >
        <div className="space-y-6">
          {/* Brand Header inside Sidebar */}
          <div className="px-2 py-2 border-b border-[#E0E8E1] pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-lg bg-[#123D2A] text-[#A3D977] font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172B22] tracking-tight leading-none">
                  {t('appName')}
                </h2>
                <p className="text-[11px] font-semibold text-[#26734D] mt-1">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-[#718078] mb-2">
              Farmer Menu
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#26734D] ${
                        isActive
                          ? 'bg-[#F1F8EC] text-[#123D2A] border-l-4 border-[#26734D]'
                          : 'text-[#718078] hover:text-[#172B22] hover:bg-[#F5F8F4]'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4.5 h-4.5 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge ? (
                      <span className="text-[10px] font-bold bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#C8E6C9]">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#718078] opacity-50" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer Widget */}
        <div className="p-3.5 rounded-lg bg-[#F5F8F4] border border-[#E0E8E1] space-y-1">
          <div className="flex items-center space-x-2 text-[#123D2A] text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-[#26734D]" />
            <span>Kisan Assistance Mode</span>
          </div>
          <p className="text-[11px] text-[#718078] leading-tight">
            Practical crop & soil decision support.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
