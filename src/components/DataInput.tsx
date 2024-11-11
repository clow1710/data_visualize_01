import React from 'react';

interface DataInputProps {
  data: [string, string, string];
  onChange: (dimension: number, value: string) => void;
}

export function DataInput({ data, onChange }: DataInputProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['维度 1', '维度 2', '维度 3'].map((label, index) => (
        <div key={label} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <textarea
            value={data[index]}
            onChange={(e) => onChange(index, e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入数据，使用换行符或逗号分隔"
          />
        </div>
      ))}
    </div>
  );
}