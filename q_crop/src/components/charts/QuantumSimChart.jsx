import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { generateQubitStateDistribution } from '../../utils/quantumCalculations';

export const QuantumSimChart = ({ qubits = 4, height = 240 }) => {
  const data = generateQubitStateDistribution(qubits);

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: -25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" vertical={false} />
          <XAxis dataKey="state" stroke="#718078" fontSize={10} interval={0} angle={-30} textAnchor="end" />
          <YAxis stroke="#718078" fontSize={11} domain={[0, 0.4]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E8E1',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#172B22',
              fontSize: '12px'
            }}
            formatter={(value) => [`${(value * 100).toFixed(2)}%`, 'Probability Amplitude']}
          />
          <Bar dataKey="probability" fill="#26734D" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
