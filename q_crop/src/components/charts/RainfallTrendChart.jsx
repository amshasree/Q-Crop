import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { SEASONAL_RAINFALL_TREND } from '../../data/demoData';

export const RainfallTrendChart = ({ height = 260 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={SEASONAL_RAINFALL_TREND}
          margin={{ top: 10, right: 15, bottom: 0, left: -15 }}
        >
          <defs>
            <linearGradient id="rainGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#26734D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#26734D" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" vertical={false} />
          <XAxis dataKey="month" stroke="#718078" fontSize={11} tickLine={false} />
          <YAxis stroke="#718078" fontSize={11} tickFormatter={(v) => `${v}mm`} />
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
              `${value} mm (Sample)`,
              name === 'rainfall' ? 'Sample Monthly Rainfall' : name
            ]}
          />
          <Area
            type="monotone"
            dataKey="rainfall"
            stroke="#123D2A"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#rainGlow)"
            name="Sample Rainfall"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainfallTrendChart;
