import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface Plotly2DChartProps {
  data: any[];
}

export function Plotly2DChart({ data }: Plotly2DChartProps) {
  const [plotData, setPlotData] = useState(data);

  useEffect(() => {
    setPlotData(data);
  }, [data]);

  const layout = {
    autosize: true,
    xaxis: { title: '维度 1' },
    yaxis: { title: '值' },
    margin: { l: 50, r: 30, b: 50, t: 30 },
    legend: { orientation: 'h' },
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler={true}
    />
  );
}