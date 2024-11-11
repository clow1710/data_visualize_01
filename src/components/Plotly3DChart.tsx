import React from 'react';
import Plot from 'react-plotly.js';

interface Plotly3DChartProps {
  data: any[];
}

export function Plotly3DChart({ data }: Plotly3DChartProps) {
  const layout = {
    autosize: true,
    scene: {
      xaxis: { title: '维度 1' },
      yaxis: { title: '维度 2' },
      zaxis: { title: '维度 3' },
    },
    margin: { l: 0, r: 0, b: 0, t: 0 },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler={true}
    />
  );
}