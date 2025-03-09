import React from 'react';
import { SwatchIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const ChartCustomizer = ({ options, setOptions, type }) => {
  const handleTitleChange = (e) => {
    setOptions(prev => ({
      ...prev,
      plugins: {
        ...prev.plugins,
        title: {
          ...prev.plugins.title,
          text: e.target.value
        }
      }
    }));
  };

  const handleColorChange = (index, color) => {
    setOptions(prev => {
      const newData = { ...prev };
      if (newData.data && newData.data.datasets) {
        newData.data.datasets[0].backgroundColor[index] = color;
        newData.data.datasets[0].borderColor[index] = color.replace('0.5', '1');
      }
      return newData;
    });
  };

  const colors = [
    '#3B82F6', // 蓝色
    '#10B981', // 绿色
    '#6366F1', // 靛蓝
    '#F59E0B', // 琥珀
    '#EF4444', // 红色
    '#8B5CF6', // 紫色
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          图表设置
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              图表标题
            </label>
            <input
              type="text"
              value={options?.plugins?.title?.text || ''}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="输入图表标题"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <SwatchIcon className="h-5 w-5 inline mr-1" />
              配色方案
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color, index) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(index, color)}
                  className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {type !== 'pie' && type !== 'doughnut' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Y轴标题
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入Y轴标题"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartCustomizer; 