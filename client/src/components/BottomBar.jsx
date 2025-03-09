import React from 'react';
import { 
  ArrowDownTrayIcon,
  ShareIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

const BottomBar = () => {
  const handleExport = (format) => {
    // TODO: 实现导出功能
    console.log(`导出 ${format} 格式`);
  };

  const handleShare = (platform) => {
    // TODO: 实现分享功能
    console.log(`分享到 ${platform}`);
  };

  const copyLink = () => {
    // TODO: 实现复制链接功能
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 导出选项 */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleExport('png')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
            导出 PNG
          </button>
          <button
            onClick={() => handleExport('svg')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
            导出 SVG
          </button>
        </div>

        {/* 分享选项 */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleShare('twitter')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ShareIcon className="h-5 w-5 mr-2 text-gray-500" />
            分享到 X
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ShareIcon className="h-5 w-5 mr-2 text-gray-500" />
            分享到 LinkedIn
          </button>
          <button
            onClick={copyLink}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <DocumentDuplicateIcon className="h-5 w-5 mr-2 text-gray-500" />
            复制链接
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar; 