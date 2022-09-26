import React from 'react';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

const Chart: React.FC<{
  data: any;
  width: number;
  height: number;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={120}
        data={data}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#eee" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#aaa" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="linear" strokeWidth={2} dataKey="total"
          stroke="#fff" fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;