import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';
import { CLIMATE_IMPACT_DATA } from '../../data/mockData';

export const ClimateImpactChart = ({ height = 260 }) => {
  const colors = ['#123D2A', '#26734D', '#5B8C6E', '#84B892', '#A3D977'];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={CLIMATE_IMPACT_DATA} margin={{ top: 10, right: 10, bottom: 25, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" vertical={false} />
          <XAxis
            dataKey="factor"
            stroke="#718078"
            fontSize={11}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis stroke="#718078" fontSize={12} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E8E1',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#172B22',
              fontSize: '12px'
            }}
            formatter={(value, name, item) => [
              `${value} / 100 (Weight: ${item.payload.quantumTensorWeight})`,
              'Sensitivity Score'
            ]}
          />
          <Bar dataKey="sensitivity" radius={[4, 4, 0, 0]}>
            {CLIMATE_IMPACT_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
