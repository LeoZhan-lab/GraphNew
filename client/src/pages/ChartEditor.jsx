import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chart as ChartJS } from 'chart.js/auto';
import { getChart, createChart, updateChart, importFromCSV, importFromExcel } from '../services/chartService';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  SwatchIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import DataTableEditor from '../components/DataTableEditor';

const chartTypes = [
  { id: 'bar', name: '柱状图' },
  { id: 'line', name: '折线图' },
  { id: 'pie', name: '饼图' },
  { id: 'doughnut', name: '环形图' },
  { id: 'scatter', name: '散点图' },
  { id: 'bubble', name: '气泡图' },
  { id: 'radar', name: '雷达图' },
  { id: 'polarArea', name: '极地图' }
];

const ChartEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'bar',
    isPublic: false,
    data: {
      labels: [],
      datasets: [{
        label: '数据集 1',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: ''
        }
      }
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chartType, setChartType] = useState('line');
  const [activeTab, setActiveTab] = useState('data');
  const [chartTitle, setChartTitle] = useState('未命名图表');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadChart();
    }
  }, [id]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new ChartJS(ctx, {
        type: formData.type,
        data: formData.data,
        options: formData.options
      });

      setChartInstance(newChartInstance);
    }
  }, [formData]);

  const loadChart = async () => {
    try {
      setLoading(true);
      const data = await getChart(id);
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      options: {
        ...prev.options,
        plugins: {
          ...prev.options.plugins,
          title: {
            ...prev.options.plugins.title,
            text: name === 'title' ? value : prev.options.plugins.title.text
          }
        }
      }
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop().toLowerCase();
      let data;

      if (fileExt === 'csv') {
        data = await importFromCSV(file);
      } else if (['xls', 'xlsx'].includes(fileExt)) {
        data = await importFromExcel(file);
      } else {
        throw new Error('不支持的文件类型');
      }

      setFormData(prev => ({
        ...prev,
        data
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      if (id) {
        await updateChart(id, formData);
      } else {
        await createChart(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // 模拟保存操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 顶部工具栏 */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              className="bg-transparent border-none text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition duration-200 flex items-center">
              <ShareIcon className="h-5 w-5 mr-2" />
              分享
            </button>
            <button className="px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition duration-200 flex items-center">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              导出
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center transition duration-200 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  保存中...
                </>
              ) : (
                <>
                  <CheckIcon className="h-5 w-5 mr-2" />
                  保存
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 主要编辑区域 */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* 左侧面板 */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            {/* 面板标签页 */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('data')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'data'
                    ? 'text-white bg-gray-700'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <TableCellsIcon className="h-5 w-5 mx-auto mb-1" />
                数据
              </button>
              <button
                onClick={() => setActiveTab('style')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'style'
                    ? 'text-white bg-gray-700'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <SwatchIcon className="h-5 w-5 mx-auto mb-1" />
                样式
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'text-white bg-gray-700'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mx-auto mb-1" />
                设置
              </button>
            </div>

            {/* 面板内容 */}
            <div className="p-4">
              {activeTab === 'data' && (
                <div className="space-y-4">
                  {/* 图表类型选择 */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'line', icon: PresentationChartLineIcon, label: '折线图' },
                      { type: 'bar', icon: ChartBarIcon, label: '柱状图' },
                      { type: 'pie', icon: ChartPieIcon, label: '饼图' },
                    ].map(({ type, icon: Icon, label }) => (
                      <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`p-3 rounded-lg flex flex-col items-center ${
                          chartType === type
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                        }`}
                      >
                        <Icon className="h-6 w-6 mb-1" />
                        <span className="text-xs">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 数据编辑器 */}
                  <DataTableEditor data={formData.data} onChange={(newData) => setFormData(prev => ({ ...prev, data: newData }))} />
                </div>
              )}

              {activeTab === 'style' && (
                <div className="space-y-4">
                  {/* 配色方案 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">配色方案</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['#3B82F6', '#10B981', '#6366F1', '#F59E0B'].map((color) => (
                        <button
                          key={color}
                          className="w-full aspect-square rounded-lg"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 其他样式选项 */}
                  {/* ... */}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  {/* 图表设置 */}
                  {/* ... */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧预览区域 */}
        <div className="flex-1">
          <motion.div
            layout
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="aspect-w-16 aspect-h-9">
              {chartType === 'line' && <Line data={formData.data} />}
              {chartType === 'bar' && <Bar data={formData.data} />}
              {chartType === 'pie' && <Pie data={formData.data} />}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChartEditor; 