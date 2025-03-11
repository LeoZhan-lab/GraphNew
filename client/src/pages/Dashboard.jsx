import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PresentationChartLineIcon,
  ChartBarIcon,
  ChartPieIcon,
  PlusIcon,
  FolderIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const navigate = useNavigate();

  // 示例图表数据
  const charts = [
    { id: 1, name: '月度销售报告', type: 'line', updatedAt: '2024-01-20', starred: true },
    { id: 2, name: '用户增长分析', type: 'bar', updatedAt: '2024-01-19', starred: false },
    { id: 3, name: '收入分布', type: 'pie', updatedAt: '2024-01-18', starred: true },
    // ... 更多图表
  ];

  const handleCreateChart = () => {
    navigate('/chart/new');
  };

  const handleEditChart = (id) => {
    navigate(`/chart/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 顶部导航栏 */}
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PresentationChartLineIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4 text-xl font-semibold text-white">ChartPic</div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleCreateChart}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center transition duration-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                新建图表
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-white">U</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标题区域 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">我的图表</h1>
          <p className="mt-1 text-gray-400">管理和创建您的数据可视化图表</p>
        </div>

        {/* 标签页 */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            {[
              { id: 'all', name: '全部图表', icon: FolderIcon },
              { id: 'starred', name: '已收藏', icon: StarIcon },
              { id: 'recent', name: '最近编辑', icon: ClockIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 图表网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charts.map((chart) => (
            <motion.div
              key={chart.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition duration-200"
            >
              {/* 图表预览 */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-700/50">
                {chart.type === 'line' && <PresentationChartLineIcon className="h-12 w-12 text-gray-500 m-auto" />}
                {chart.type === 'bar' && <ChartBarIcon className="h-12 w-12 text-gray-500 m-auto" />}
                {chart.type === 'pie' && <ChartPieIcon className="h-12 w-12 text-gray-500 m-auto" />}
              </div>

              {/* 图表信息 */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">{chart.name}</h3>
                  <button
                    className={`p-1 rounded-full ${
                      chart.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <StarIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  最后编辑于 {chart.updatedAt}
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-700">
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => handleEditChart(chart.id)}
                    className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition duration-200"
                  >
                    编辑
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 新建图表卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 transition duration-200 flex items-center justify-center cursor-pointer group"
          >
            <div className="text-center p-8">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gray-700 flex items-center justify-center group-hover:bg-blue-500 transition duration-200">
                <PlusIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
              </div>
              <p className="mt-4 text-gray-400 group-hover:text-blue-400">创建新图表</p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 