import React from 'react';
import { LineChart, Box } from 'lucide-react';

interface VisualizationControlsProps {
  is3D: boolean;
  onViewChange: (is3D: boolean) => void;
  onGenerateTestData: () => void;
}

export function VisualizationControls({
  is3D,
  onViewChange,
  onGenerateTestData,
}: VisualizationControlsProps) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onGenerateTestData}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        生成测试数据
      </button>
      
      <div className="flex space-x-4">
        <button
          onClick={() => onViewChange(false)}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            !is3D ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          <LineChart size={20} />
          <span>2D 视图</span>
        </button>
        <button
          onClick={() => onViewChange(true)}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            is3D ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          <Box size={20} />
          <span>3D 视图</span>
        </button>
      </div>
    </div>
  );
}