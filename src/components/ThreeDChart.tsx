import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface ThreeDChartProps {
  data: [number[], number[], number[]];
}

export function ThreeDChart({ data }: ThreeDChartProps) {
  const [x, y, z] = data;

  const points = React.useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < x.length; i++) {
      positions.push(x[i], y[i], z[i]);
    }
    return new Float32Array(positions);
  }, [x, y, z]);

  return (
    <Canvas camera={{ position: [0, 0, 100], near: 0.1, far: 1000 }}>
      <ambientLight />
      <OrbitControls />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={points}
            count={points.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#1f77b4" size={1} />
      </points>
    </Canvas>
  );
}