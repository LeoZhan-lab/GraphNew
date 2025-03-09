import React from 'react';
import {
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import dataProcessor from '../utils/dataProcessor';

const DataExporter = ({ chartData }) => {
  const handleExport = async (format) => {
    if (!chartData) {
      toast.error('没有可导出的数据');
      return;
    }

    try {
      switch (format) {
        case 'csv':
          dataProcessor.exportToCSV(chartData);
          break;
        case 'excel':
          dataProcessor.exportToExcel(chartData);
          break;
        default:
          throw new Error('不支持的导出格式');
      }
      toast.success('导出成功');
    } catch (error) {
      console.error('导出失败:', error);
      toast.error('导出失败: ' + error.message);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
        导出数据
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleExport('csv')}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          导出为 CSV
        </button>
        <button
          onClick={() => handleExport('excel')}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <TableCellsIcon className="h-5 w-5 mr-2" />
          导出为 Excel
        </button>
      </div>
    </div>
  );
};

export default DataExporter; 