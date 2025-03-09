import React, { useState } from 'react';
import { CloudArrowUpIcon, DocumentTextIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import dataProcessor from '../utils/dataProcessor';

const DataImporter = ({ onDataImport }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file) => {
    try {
      let data;
      if (file.name.endsWith('.csv')) {
        data = await dataProcessor.parseCSV(file);
      } else if (file.name.match(/\.xlsx?$/)) {
        data = await dataProcessor.parseExcel(file);
      } else {
        throw new Error('不支持的文件格式');
      }
      
      onDataImport(data);
      toast.success('数据导入成功');
    } catch (error) {
      console.error('数据导入失败:', error);
      toast.error('数据导入失败: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          id="file-upload"
          onChange={handleFileSelect}
        />
        
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <CloudArrowUpIcon className="h-12 w-12 text-gray-400" />
          <span className="mt-2 text-sm font-medium text-gray-900">
            拖拽文件到此处或点击上传
          </span>
          <span className="mt-1 text-xs text-gray-500">
            支持 CSV、Excel 文件
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => document.getElementById('file-upload').click()}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <DocumentTextIcon className="h-5 w-5 mr-2" />
          导入文件
        </button>
        <button
          onClick={() => {
            // TODO: 实现从剪贴板导入
            toast.info('即将支持');
          }}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <TableCellsIcon className="h-5 w-5 mr-2" />
          从剪贴板导入
        </button>
      </div>
    </div>
  );
};

export default DataImporter; 