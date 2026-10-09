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
import { REGIONAL_YIELD_DATA } from '../../data/mockData';

export const RegionalYieldChart = ({ height = 260 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={REGIONAL_YIELD_DATA} margin={{ top: 10, right: 10, bottom: 25, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" vertical={false} />
          <XAxis dataKey="region" stroke="#718078" fontSize={11} interval={0} angle={-15} textAnchor="end" />
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
            formatter={(value, name) => [`${value} t/ha`, name.toUpperCase()]}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="wheat" fill="#123D2A" radius={[3, 3, 0, 0]} name="Wheat" />
          <Bar dataKey="corn" fill="#26734D" radius={[3, 3, 0, 0]} name="Corn" />
          <Bar dataKey="soy" fill="#A3D977" radius={[3, 3, 0, 0]} name="Soybeans" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
