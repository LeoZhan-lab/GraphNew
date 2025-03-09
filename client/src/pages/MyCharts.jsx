import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import chartService from '../services/chartService';
import {
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const MyCharts = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {
      const data = await chartService.getCharts();
      setCharts(data);
    } catch (error) {
      console.error('加载图表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除这个图表吗？')) {
      try {
        await chartService.deleteChart(id);
        setCharts(charts.filter(chart => chart.id !== id));
      } catch (error) {
        console.error('删除图表失败:', error);
      }
    }
  };

  const handleExport = async (id, format) => {
    try {
      const blob = await chartService.exportChart(id, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chart-${id}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出图表失败:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">我的图表</h1>
            <p className="mt-1 text-sm text-gray-500">
              管理您创建的所有图表
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            创建新图表
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {charts.map((chart) => (
              <div
                key={chart.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {chart.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    创建于 {new Date(chart.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit/${chart.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(chart.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      删除
                    </button>
                    <button
                      onClick={() => handleExport(chart.id, 'png')}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                      导出
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyCharts; 