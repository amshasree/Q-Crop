import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { CROP_DISTRIBUTION_DATA } from '../../data/demoData';

export const CropDistributionChart = ({ height = 280 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 10, left: 0 }}>
          <Pie
            data={CROP_DISTRIBUTION_DATA}
            cx="50%"
            cy="48%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="share"
            nameKey="name"
          >
            {CROP_DISTRIBUTION_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
              `${value}% (${item.payload.hectares})`,
              'Demo Distribution'
            ]}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropDistributionChart;
