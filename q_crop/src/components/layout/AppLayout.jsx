import React, { useState } from 'react';
import { TopHeader } from './TopHeader';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { LanguageProvider } from '../../context/LanguageContext';
import { AuthProvider } from '../../context/AuthContext';

export const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-[#F5F8F4] text-[#172B22] antialiased pb-20 lg:pb-0">
          <TopHeader toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
              {children}
            </main>
          </div>

          <Footer />
          <MobileBottomNav />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default AppLayout;
