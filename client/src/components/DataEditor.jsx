import React, { useState } from 'react';
import {
  TableCellsIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  PlusIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import dataProcessor from '../utils/dataProcessor';
import * as XLSX from 'xlsx';

const DataEditor = ({ data, onChange }) => {
  const [view, setView] = useState('table');
  const [csvContent, setCsvContent] = useState('');

  const handleCsvChange = async (e) => {
    const content = e.target.value;
    setCsvContent(content);
    try {
      const chartData = await dataProcessor.csvToChartData(content);
      onChange(chartData);
    } catch (error) {
      toast.error('CSV格式错误');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      let chartData;
      if (file.type === 'text/csv') {
        const text = await file.text();
        chartData = await dataProcessor.csvToChartData(text);
        setCsvContent(text);
      } else {
        chartData = await dataProcessor.excelToChartData(file);
      }
      onChange(chartData);
      toast.success('数据导入成功');
    } catch (error) {
      toast.error('文件导入失败');
      console.error('文件导入失败:', error);
    }
  };

  const handleExport = (format) => {
    try {
      if (format === 'csv') {
        const csv = dataProcessor.chartDataToCsv(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chart-data.csv';
        link.click();
      } else if (format === 'xlsx') {
        const wb = dataProcessor.chartDataToExcel(data);
        XLSX.writeFile(wb, 'chart-data.xlsx');
      }
    } catch (error) {
      toast.error('导出失败');
      console.error('导出失败:', error);
    }
  };

  const addNewRow = () => {
    const newData = { ...data };
    newData.labels.push(`标签 ${newData.labels.length + 1}`);
    newData.datasets.forEach(dataset => {
      dataset.data.push(0);
    });
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setView('table')}
            className={`flex items-center px-4 py-2 rounded-md ${
              view === 'table'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TableCellsIcon className="h-5 w-5 mr-2" />
            表格视图
          </button>       
          <button
            onClick={() => setView('csv')}
            className={`flex items-center px-4 py-2 rounded-md ${
              view === 'csv'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            CSV编辑
          </button>
          <button
            onClick={() => setView('import')}
            className={`flex items-center px-4 py-2 rounded-md ${
              view === 'import'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CloudArrowUpIcon className="h-5 w-5 mr-2" />
            导入数据
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport('csv')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
            导出CSV
          </button>
          <button
            onClick={() => handleExport('xlsx')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
            导出Excel
          </button>
        </div>
      </div>

      {view === 'table' && (
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {data.labels.map((label, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.datasets[0].data.map((value, rowIndex) => (
                  <tr key={rowIndex}>
                    {data.labels.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        <input
                          type="text"
                          value={
                            colIndex === 0
                              ? data.labels[rowIndex]
                              : data.datasets[colIndex - 1].data[rowIndex]
                          }
                          onChange={(e) => {
                            const newData = { ...data };
                            if (colIndex === 0) {
                              newData.labels[rowIndex] = e.target.value;
                            } else {
                              newData.datasets[colIndex - 1].data[rowIndex] =
                                parseFloat(e.target.value) || 0;
                            }
                            onChange(newData);
                          }}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          const newData = { ...data };
                          newData.labels = newData.labels.filter(
                            (_, index) => index !== rowIndex
                          );
                          newData.datasets.forEach((dataset) => {
                            dataset.data = dataset.data.filter(
                              (_, index) => index !== rowIndex
                            );
                          });
                          onChange(newData);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addNewRow}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            添加行
          </button>
        </div>
      )}

      {/* CSV编辑视图 */}
      {view === 'csv' && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-md p-4">
            <p className="text-sm text-gray-600">
              使用CSV格式编辑数据。每行一条记录，字段用逗号分隔。第一行为标题行。
            </p>
          </div>
          <textarea
            value={csvContent}
            onChange={handleCsvChange}
            rows={10}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="标签,值1,值2,..."
          />
        </div>
      )}

      {/* 文件导入视图 */}
      {view === 'import' && (
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
              <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
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
    </div>
  );
};

export default DataEditor; 