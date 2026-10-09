import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sprout, CheckCircle2, Globe, WifiOff, User, LogIn, LogOut } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const TopHeader = ({ toggleSidebar }) => {
  const { language, changeLanguage, t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E0E8E1] shadow-xs print:hidden">
      {/* Offline Status Alert */}
      {!isOnline && (
        <div className="bg-[#FFF8E1] border-b border-[#FFE082] px-4 py-2 text-xs font-bold text-[#B76E00] flex items-center justify-center space-x-2">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>{t('offlineNotice')}</span>
        </div>
      )}

      {/* Language Preview Mode Alert */}
      {language === 'te' && (
        <div className="bg-[#F1F8EC] border-b border-[#A3D977] px-4 py-1.5 text-xs text-[#123D2A] font-semibold flex items-center justify-between">
          <span>{t('teluguNotice')}</span>
          <StatusBadge variant="neutral" size="sm">
            తెలుగు Preview
          </StatusBadge>
        </div>
      )}

      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5">
        {/* Left Side: Mobile Menu Button & Brand indicator */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#718078] hover:text-[#172B22] rounded-lg hover:bg-[#F5F8F4] focus:outline-none focus:ring-2 focus:ring-[#26734D] transition cursor-pointer lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-[#123D2A] text-[#A3D977]">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#172B22] tracking-tight leading-none">
                {t('appName')}
              </h1>
              <p className="text-[11px] font-semibold text-[#26734D] mt-0.5">
                {t('appSubtitle')}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Side: Language Selector & User Profile / Login */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Selector Dropdown */}
          <div className="flex items-center space-x-1 bg-[#F5F8F4] border border-[#E0E8E1] rounded-lg px-2 py-1">
            <Globe className="w-4 h-4 text-[#26734D] shrink-0" />
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              aria-label="Select platform language"
              className="bg-transparent text-xs font-bold text-[#123D2A] focus:outline-none cursor-pointer py-1 min-h-[36px]"
            >
              <option value="en">English</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>

          {/* User Auth Section */}
          {currentUser ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-[#E0E8E1]">
              <div className="hidden md:flex items-center space-x-1.5 text-xs">
                <User className="w-4 h-4 text-[#26734D]" />
                <span className="font-bold text-[#172B22] truncate max-w-[120px]">
                  {currentUser.fullName}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 min-h-[36px] px-2.5 rounded-lg border border-[#E0E8E1] hover:bg-[#FFEBEE] text-xs font-semibold text-[#C62828] transition-colors flex items-center space-x-1 cursor-pointer"
                title="Logout from account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 pl-2 border-l border-[#E0E8E1]">
              <Link
                to="/login"
                className="px-3 py-1.5 min-h-[36px] rounded-lg bg-[#123D2A] text-white text-xs font-bold hover:bg-[#26734D] transition-colors flex items-center space-x-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
