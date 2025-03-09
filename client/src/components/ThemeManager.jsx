import React, { useState } from 'react';
import { SwatchIcon, CheckIcon } from '@heroicons/react/24/outline';

const ThemeManager = ({ onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const themes = [
    {
      id: 'default',
      name: '默认主题',
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#6366F1',
        background: '#F9FAFB'
      }
    },
    {
      id: 'dark',
      name: '深色主题',
      colors: {
        primary: '#60A5FA',
        secondary: '#34D399',
        accent: '#818CF8',
        background: '#1F2937'
      }
    },
    {
      id: 'elegant',
      name: '优雅主题',
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#F59E0B',
        background: '#F3F4F6'
      }
    },
    {
      id: 'modern',
      name: '现代主题',
      colors: {
        primary: '#2563EB',
        secondary: '#059669',
        accent: '#7C3AED',
        background: '#F8FAFC'
      }
    }
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme.id);
    onThemeChange(theme);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <SwatchIcon className="h-5 w-5 mr-2" />
        主题设置
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              selectedTheme === theme.id
                ? 'border-blue-500'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* 主题预览 */}
            <div className="space-y-2">
              <div className="flex space-x-2">
                {Object.values(theme.colors).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {theme.name}
              </div>
            </div>

            {/* 选中标记 */}
            {selectedTheme === theme.id && (
              <div className="absolute top-2 right-2">
                <CheckIcon className="h-5 w-5 text-blue-500" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 自定义颜色 */}
      <div className="mt-6 space-y-4">
        <h4 className="text-sm font-medium text-gray-900">自定义颜色</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              主要颜色
            </label>
            <input
              type="color"
              className="block w-full h-10 rounded-md border-gray-300"
              onChange={(e) =>
                onThemeChange({
                  ...themes.find((t) => t.id === selectedTheme),
                  colors: {
                    ...themes.find((t) => t.id === selectedTheme).colors,
                    primary: e.target.value
                  }
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              次要颜色
            </label>
            <input
              type="color"
              className="block w-full h-10 rounded-md border-gray-300"
              onChange={(e) =>
                onThemeChange({
                  ...themes.find((t) => t.id === selectedTheme),
                  colors: {
                    ...themes.find((t) => t.id === selectedTheme).colors,
                    secondary: e.target.value
                  }
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeManager; 