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
import { FEATURE_IMPORTANCE_DATA } from '../../data/mockData';

export const FeatureImportanceChart = ({ height = 260 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={FEATURE_IMPORTANCE_DATA}
          margin={{ top: 10, right: 20, bottom: 0, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" horizontal={false} />
          <XAxis type="number" stroke="#718078" fontSize={11} domain={[0, 100]} />
          <YAxis dataKey="feature" type="category" stroke="#718078" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E8E1',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#172B22',
              fontSize: '12px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
          <Bar dataKey="classical" fill="#94A3B8" radius={[0, 3, 3, 0]} name="Classical ML Weight" />
          <Bar dataKey="quantum" fill="#123D2A" radius={[0, 3, 3, 0]} name="Quantum Shapley Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
