import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ChartPreview from '../components/ChartPreview';
import ChartCustomizer from '../components/ChartCustomizer';
import DataEditor from '../components/DataEditor';
import chartService from '../services/chartService';
import { toast } from 'react-toastify';
import ShareDialog from '../components/ShareDialog';
import { ShareIcon } from '@heroicons/react/24/outline';

const EditChart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [chart, setChart] = useState(null);
  const [activeTab, setActiveTab] = useState('data');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  useEffect(() => {
    loadChart();
  }, [id]);

  const loadChart = async () => {
    try {
      const data = await chartService.getChart(id);
      setChart(data);
    } catch (error) {
      toast.error('加载图表失败');
      console.error('加载图表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await chartService.updateChart(id, chart);
      toast.success('图表已保存');
    } catch (error) {
      toast.error('保存失败');
      console.error('保存失败:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">编辑图表</h1>
            <p className="mt-1 text-sm text-gray-500">
              自定义图表数据和样式
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsShareDialogOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              分享
            </button>
            <button
              onClick={() => navigate('/my-charts')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('data')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'data'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                数据
              </button>
              <button
                onClick={() => setActiveTab('style')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'style'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                样式
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8">
                {activeTab === 'data' ? (
                  <DataEditor
                    data={chart.data}
                    onChange={(newData) =>
                      setChart({ ...chart, data: newData })
                    }
                  />
                ) : (
                  <ChartCustomizer
                    options={chart.options}
                    setOptions={(newOptions) =>
                      setChart({ ...chart, options: newOptions })
                    }
                    type={chart.type}
                  />
                )}
              </div>
              <div className="col-span-4">
                <div className="sticky top-6">
                  <ChartPreview
                    type={chart.type}
                    data={chart.data}
                    options={chart.options}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ShareDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          chartId={id}
        />
      </div>
    </Layout>
  );
};

export default EditChart; 