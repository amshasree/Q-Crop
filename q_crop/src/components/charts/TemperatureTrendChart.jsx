import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { SEASONAL_RAINFALL_TREND } from '../../data/demoData';

export const TemperatureTrendChart = ({ data = SEASONAL_RAINFALL_TREND, height = 260 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, bottom: 0, left: -15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" vertical={false} />
          <XAxis dataKey="month" stroke="#718078" fontSize={11} tickLine={false} />
          <YAxis stroke="#718078" fontSize={11} tickFormatter={(v) => `${v}°C`} domain={[10, 40]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E8E1',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#172B22',
              fontSize: '12px'
            }}
            formatter={(value) => [`${value}°C (Sample)`, 'Avg Temperature']}
          />
          <Line
            type="monotone"
            dataKey="avgTemp"
            stroke="#26734D"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#26734D' }}
            activeDot={{ r: 6, fill: '#123D2A' }}
            name="Sample Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureTrendChart;
