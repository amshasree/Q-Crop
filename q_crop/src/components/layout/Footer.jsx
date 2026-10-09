import React from 'react';
import { Sprout, Code2, Share2, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-[#E0E8E1] bg-white text-[#718078] py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-md bg-[#123D2A] text-[#A3D977]">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-[#172B22] tracking-tight">Quantum Farming</span>
          </div>
          <p className="text-xs text-[#718078] leading-relaxed">
            Smarter Predictions. Better Harvests. Empowering global agriculture through variational quantum algorithms.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172B22] mb-2.5">Platform</h4>
          <ul className="space-y-1.5 text-xs">
            <li><a href="/predict" className="hover:text-[#26734D] transition">Quantum Predictor</a></li>
            <li><a href="/analytics" className="hover:text-[#26734D] transition">Precision Analytics</a></li>
            <li><a href="/crop-insights" className="hover:text-[#26734D] transition">Agronomic Insights</a></li>
            <li><a href="/quantum-tech" className="hover:text-[#26734D] transition">Quantum Telemetry</a></li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172B22] mb-2.5">Tech Architecture</h4>
          <ul className="space-y-1.5 text-xs">
            <li>React 19 + Vite</li>
            <li>Tailwind CSS Design System</li>
            <li>Qiskit & QPU State Vector Sim</li>
            <li>Recharts Data Visualization</li>
          </ul>
        </div>

        {/* Global Hardware Partners */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172B22] mb-2.5">Infrastructure</h4>
          <p className="text-xs text-[#718078] mb-2.5">
            Connected via IBM Quantum Network, Quantinuum H2 & IonQ Aria.
          </p>
          <div className="flex space-x-3 text-[#718078]">
            <a href="#code" className="hover:text-[#26734D] transition"><Code2 className="w-4 h-4" /></a>
            <a href="#share" className="hover:text-[#26734D] transition"><Share2 className="w-4 h-4" /></a>
            <a href="#globe" className="hover:text-[#26734D] transition"><Globe className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-[#E0E8E1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#718078]">
        <p>© {new Date().getFullYear()} Quantum Farming. All rights reserved.</p>
        <p className="mt-1 sm:mt-0 font-medium text-[#26734D]">
          Smarter Predictions. Better Harvests.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
