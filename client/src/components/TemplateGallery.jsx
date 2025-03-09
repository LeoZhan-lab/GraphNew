import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  ChartPieIcon,
  ChartLineIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import templateService from '../services/templateService';

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await templateService.getTemplates();
      setTemplates(data);
    } catch (error) {
      toast.error('加载模板失败');
      console.error('加载模板失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFromTemplate = async (templateId) => {
    try {
      const chart = await templateService.createFromTemplate(templateId);
      toast.success('图表创建成功');
      navigate(`/edit/${chart.id}`);
    } catch (error) {
      toast.error('创建图表失败');
      console.error('创建图表失败:', error);
    }
  };

  const categories = [
    { id: 'all', name: '全部', icon: SparklesIcon },
    { id: 'business', name: '商业', icon: ChartBarIcon },
    { id: 'data', name: '数据分析', icon: ChartLineIcon },
    { id: 'presentation', name: '演示', icon: ChartPieIcon },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* 分类选择 */}
      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedCategory === category.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <category.icon className="h-5 w-5 mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* 预览图 */}
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="object-cover"
                />
              </div>

              {/* 模板信息 */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {template.description}
                </p>
              </div>

              {/* 悬浮操作 */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCreateFromTemplate(template.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  使用此模板
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateGallery; 