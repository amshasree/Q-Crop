import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const RainfallYieldScatterPlot = ({ records = [], height = 280 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 20, bottom: 25, left: -15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E8E1" />
          <XAxis
            type="number"
            dataKey="rainfall"
            name="Seasonal Rainfall"
            unit=" mm"
            stroke="#718078"
            fontSize={11}
            domain={['dataMin - 50', 'dataMax + 50']}
          />
          <YAxis
            type="number"
            dataKey="illustrativeYield"
            name="Illustrative Yield"
            unit=" t/ha"
            stroke="#718078"
            fontSize={11}
            domain={[0, 'dataMax + 1']}
          />
          <ZAxis dataKey="crop" name="Crop" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E8E1',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#172B22',
              fontSize: '12px'
            }}
            formatter={(value, name, item) => {
              if (name === 'Seasonal Rainfall') return [`${value} mm`, name];
              if (name === 'Illustrative Yield') return [`${value} t/ha (Sample)`, name];
              return [value, name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          <Scatter
            name="Sample Field Records"
            data={records}
            fill="#123D2A"
            line={false}
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainfallYieldScatterPlot;
