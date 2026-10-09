import React from 'react';
import { Cpu, Orbit } from 'lucide-react';

export const LoadingSpinner = ({ text = 'Simulating Quantum Circuit...', size = 'md' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative flex items-center justify-center">
        <Orbit className="w-12 h-12 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
        <Cpu className="w-6 h-6 text-cyan-300 absolute" />
      </div>
      <p className="text-sm font-medium text-emerald-300 animate-pulse tracking-wide">{text}</p>
    </div>
  );
};
