import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { YIELD_TREND_DATA } from '../../data/mockData';

export const YieldPredictionChart = ({ data = YIELD_TREND_DATA, height = 300 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="quantumGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#26734D" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#26734D" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" vertical={false} />
          <XAxis dataKey="year" stroke="#718078" fontSize={12} tickLine={false} />
          <YAxis stroke="#718078" fontSize={12} domain={['dataMin - 0.5', 'dataMax + 0.5']} tickFormatter={(v) => `${v} t/ha`} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E8E1',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#172B22',
              fontSize: '12px'
            }}
            formatter={(value, name) => [
              `${value} t/ha`,
              name === 'quantumAI' ? 'Quantum AI Forecast' : name === 'classicalML' ? 'Classical ML Baseline' : 'Verified Harvest'
            ]}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Area type="monotone" dataKey="quantumAI" stroke="#123D2A" fillOpacity={1} fill="url(#quantumGlow)" strokeWidth={2.5} name="Quantum AI Forecast" />
          <Line type="monotone" dataKey="classicalML" stroke="#718078" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 3 }} name="Classical ML Baseline" />
          <Line type="monotone" dataKey="actual" stroke="#26734D" strokeWidth={2} dot={{ r: 4, fill: '#26734D' }} name="Verified Actual Yield" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
