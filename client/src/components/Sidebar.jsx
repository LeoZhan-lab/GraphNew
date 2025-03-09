import React, { useState } from 'react';
import { 
  TableCellsIcon, 
  ArrowUpTrayIcon,
  CloudArrowUpIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('manual');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // 处理文件上传
      try {
        const formData = new FormData();
        formData.append('file', file);
        // TODO: 实现文件上传和数据处理
      } catch (error) {
        console.error('文件上传失败:', error);
      }
    }
  };

  return (
    <div className="w-80 bg-white shadow-sm border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">数据输入</h2>
        
        {/* 数据输入方式选择 */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
              activeTab === 'manual'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <TableCellsIcon className="h-5 w-5 mx-auto mb-1" />
            手动输入
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
              activeTab === 'upload'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ArrowUpTrayIcon className="h-5 w-5 mx-auto mb-1" />
            上传文件
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
              activeTab === 'cloud'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CloudArrowUpIcon className="h-5 w-5 mx-auto mb-1" />
            云端导入
          </button>
        </div>

        {/* 手动输入区域 */}
        {activeTab === 'manual' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                数据标签
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入标签，用逗号分隔"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                数据值
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="输入数值，用逗号分隔"
              />
            </div>
          </div>
        )}

        {/* 文件上传区域 */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <ArrowUpTrayIcon className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  点击或拖拽文件到这里上传
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  支持 CSV、Excel 文件
                </p>
              </label>
            </div>
          </div>
        )}

        {/* 云端导入区域 */}
        {activeTab === 'cloud' && (
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <img src="/google-sheets-icon.svg" className="h-5 w-5 mr-2" />
              连接 Google Sheets
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <img src="/excel-icon.svg" className="h-5 w-5 mr-2" />
              连接 Excel Online
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 