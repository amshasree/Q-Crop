import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export const CropYieldComparisonBarChart = ({ data = [], height = 280 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 15, bottom: 20, left: -15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" vertical={false} />
          <XAxis dataKey="crop" stroke="#718078" fontSize={12} tickLine={false} />
          <YAxis stroke="#718078" fontSize={12} tickFormatter={(v) => `${v}t`} />
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
              `${value} t/ha (Sample)`,
              name === 'illustrativeYield' ? 'Illustrative Demo Yield' : 'Baseline Yield'
            ]}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Bar dataKey="baselineYield" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Baseline Reference" />
          <Bar dataKey="illustrativeYield" fill="#123D2A" radius={[4, 4, 0, 0]} name="Illustrative Demo Yield" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropYieldComparisonBarChart;
