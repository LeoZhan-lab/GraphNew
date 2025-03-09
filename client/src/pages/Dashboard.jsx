import React, { useState } from 'react';
import Layout from '../components/Layout';
import ChartPreview from '../components/ChartPreview';
import ChartCustomizer from '../components/ChartCustomizer';
import { ChartBarIcon, ChartPieIcon, ChartLineIcon } from '@heroicons/react/24/outline';
import TemplateGallery from '../components/TemplateGallery';
import ThemeManager from '../components/ThemeManager';
import DataImporter from '../components/DataImporter';
import DataExporter from '../components/DataExporter';

const Dashboard = () => {
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '我的图表'
      }
    }
  });
  const [showTemplates, setShowTemplates] = useState(true);

  const chartTypes = [
    { id: 'bar', name: '柱状图', icon: ChartBarIcon },
    { id: 'line', name: '折线图', icon: ChartLineIcon },
    { id: 'pie', name: '饼图', icon: ChartPieIcon },
    { id: 'doughnut', name: '环形图', icon: ChartPieIcon },
  ];

  const handleThemeChange = (theme) => {
    setChartOptions(prev => ({
      ...prev,
      plugins: {
        ...prev.plugins,
        colors: theme.colors
      }
    }));
  };

  const handleDataImport = (data) => {
    setChartData(data);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">创建图表</h1>
          <p className="mt-1 text-sm text-gray-500">
            选择模板或自定义创建专业的数据可视化图表
          </p>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setShowTemplates(true)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                showTemplates
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              模板库
            </button>
            <button
              onClick={() => setShowTemplates(false)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                !showTemplates
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              自定义创建
            </button>
          </div>
        </div>

        {showTemplates ? (
          <TemplateGallery />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* 左侧面板 */}
            <div className="col-span-3 space-y-6">
              {/* 图表类型选择 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">图表类型</h3>
                <div className="space-y-2">
                  {chartTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setChartType(type.id)}
                      className={`w-full flex items-center px-4 py-2 rounded-md ${
                        chartType === type.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <type.icon className="h-5 w-5 mr-2" />
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 主题设置 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <ThemeManager onThemeChange={handleThemeChange} />
              </div>

              {/* 图表自定义设置 */}
              <ChartCustomizer
                options={chartOptions}
                setOptions={setChartOptions}
                type={chartType}
              />

              {/* 数据导入面板 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <DataImporter onDataImport={handleDataImport} />
              </div>

              {/* 数据导出面板 */}
              {chartData && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <DataExporter chartData={chartData} />
                </div>
              )}
            </div>

            {/* 右侧预览区域 */}
            <div className="col-span-9">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <ChartPreview
                  type={chartType}
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard; 