import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
import { DataInput } from './components/DataInput';
import { PolynomialControls } from './components/PolynomialControls';
import { VisualizationControls } from './components/VisualizationControls';
import { parseData, generateTestData, polynomialInterpolation, polynomialInterpolation3D } from './utils/dataProcessing';
import { Plotly3DChart } from './components/Plotly3DChart';
import { Plotly2DChart } from './components/Plotly2DChart';

// 移除 Chart.js 的注册代码
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

function App() {
  const [data, setData] = useState<[string, string, string]>(['', '', '']);
  const [is3D, setIs3D] = useState(false);
  const [polynomialEnabled, setPolynomialEnabled] = useState(false);
  const [polynomialDegree, setPolynomialDegree] = useState(3);
  const [interpolationPoints, setInterpolationPoints] = useState(50);

  const parsedData = data.map(parseData);

  const handleGenerateTestData = () => {
    const [x, y, z] = generateTestData();
    setData([
      x.join('\n'),
      y.join('\n'),
      z.join('\n'),
    ]);
  };

  const handleDataChange = (dimension: number, value: string) => {
    const newData = [...data] as [string, string, string];
    newData[dimension] = value;
    setData(newData);
  };

  // 处理 2D 图表数据
  const plotly2DData = React.useMemo(() => {
    const [x, y, z] = parsedData;
    if (x.length === 0 || y.length === 0 || z.length === 0) return null;

    type Trace = {
      x: number[];
      y: number[];
      mode: string;
      name: string;
      marker?: { color: string };
      line?: { color: string; dash: string };
    };

    let traces: Trace[] = [
      {
        x,
        y,
        mode: 'markers',
        name: '维度 2',
        marker: { color: '#1f77b4' },
      },
      {
        x,
        y: z,
        mode: 'markers',
        name: '维度 3',
        marker: { color: '#ff7f0e' },
      },
    ];

    if (polynomialEnabled) {
      const [xInterp, yInterp] = polynomialInterpolation(x, y, polynomialDegree, interpolationPoints);
      const [, zInterp] = polynomialInterpolation(x, z, polynomialDegree, interpolationPoints);

      traces = [
        ...traces,
        {
          x: xInterp,
          y: yInterp,
          mode: 'lines',
          name: '维度 2 (插值)',
          line: { color: '#1f77b4', dash: 'dash' },
        },
        {
          x: xInterp,
          y: zInterp,
          mode: 'lines',
          name: '维度 3 (插值)',
          line: { color: '#ff7f0e', dash: 'dash' },
        },
      ];
    }

    return traces;
  }, [parsedData, polynomialEnabled, polynomialDegree, interpolationPoints]);

  // 处理 3D 图表数据
  const plotly3DData = React.useMemo(() => {
    const [x, y, z] = parsedData;
    if (x.length === 0 || y.length === 0 || z.length === 0) return null;

    const traces = [
      {
        x,
        y,
        z,
        mode: 'markers',
        name: '原始数据',
        marker: {
          size: 3,
          color: z,
          colorscale: 'Viridis',
          showscale: true,
        },
        type: 'scatter3d' as const,
      },
    ];

    if (polynomialEnabled) {
      const [xInterp, yInterp, zInterp] = polynomialInterpolation3D(
        x,
        y,
        z,
        polynomialDegree,
        interpolationPoints
      );

      traces.push({
        x: xInterp,
        y: yInterp,
        z: zInterp,
        mode: 'lines',
        name: '插值曲线',
        line: {
          color: '#ff7f0e',
          width: 3,
        },
        type: 'scatter3d' as const,
      });
    }

    return traces;
  }, [parsedData, polynomialEnabled, polynomialDegree, interpolationPoints]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">数据可视化工具</h1>

          <div className="space-y-6">
            <DataInput data={data} onChange={handleDataChange} />

            <VisualizationControls
              is3D={is3D}
              onViewChange={setIs3D}
              onGenerateTestData={handleGenerateTestData}
            />

            <PolynomialControls
              enabled={polynomialEnabled}
              onEnabledChange={setPolynomialEnabled}
              degree={polynomialDegree}
              onDegreeChange={setPolynomialDegree}
              points={interpolationPoints}
              onPointsChange={setInterpolationPoints}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div style={{ height: '600px' }}>
            {!is3D && plotly2DData && (
              <Plotly2DChart data={plotly2DData} />
            )}
            {is3D && plotly3DData && (
              <Plotly3DChart data={plotly3DData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;