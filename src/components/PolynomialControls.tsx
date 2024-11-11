import React from 'react';

interface PolynomialControlsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  degree: number;
  onDegreeChange: (degree: number) => void;
  points: number;
  onPointsChange: (points: number) => void;
}

export function PolynomialControls({
  enabled,
  onEnabledChange,
  degree,
  onDegreeChange,
  points,
  onPointsChange,
}: PolynomialControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="polynomial"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="polynomial" className="ml-2 block text-sm text-gray-900">
          启用多项式插值
        </label>
      </div>

      {enabled && (
        <div className="space-y-4">
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
              多项式阶数: {degree}
            </label>
            <input
              type="range"
              id="degree"
              min="1"
              max="10"
              value={degree}
              onChange={(e) => onDegreeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700">
              插值点数: {points}
            </label>
            <input
              type="range"
              id="points"
              min="10"
              max="100"
              step="5"
              value={points}
              onChange={(e) => onPointsChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}