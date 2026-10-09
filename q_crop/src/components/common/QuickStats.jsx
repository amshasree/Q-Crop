import React from 'react';
import { Cpu, Zap, ShieldCheck, Globe } from 'lucide-react';
import { SYSTEM_STATS } from '../../data/mockData';
import { formatNumber } from '../../utils/formatters';

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div className="bg-white p-3.5 rounded-xl border border-[#E0E8E1] shadow-xs flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-[#F5F8F4] text-[#123D2A] border border-[#E0E8E1]">
          <Globe className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#718078]">Monitored Land</p>
          <p className="text-sm sm:text-base font-bold text-[#172B22]">{formatNumber(SYSTEM_STATS.activeHectares)} ha</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-[#E0E8E1] shadow-xs flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#718078]">Model Precision</p>
          <p className="text-sm sm:text-base font-bold text-[#1B5E20]">{SYSTEM_STATS.yieldPredictionAccuracy}%</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-[#E0E8E1] shadow-xs flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-[#F5F8F4] text-[#26734D] border border-[#E0E8E1]">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#718078]">VQE Circuits Run</p>
          <p className="text-sm sm:text-base font-bold text-[#26734D]">{formatNumber(SYSTEM_STATS.quantumCircuitsExecuted)}</p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-[#E0E8E1] shadow-xs flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-[#F1F8EC] text-[#123D2A] border border-[#A3D977]">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#718078]">Avg Yield Gain</p>
          <p className="text-sm sm:text-base font-bold text-[#123D2A]">{SYSTEM_STATS.averageYieldGain}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
