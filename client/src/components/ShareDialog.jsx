import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import {
  LinkIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
  LockClosedIcon,
  GlobeAltIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import shareService from '../services/shareService';

const ShareDialog = ({ isOpen, onClose, chartId }) => {
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState('');
  const [settings, setSettings] = useState({
    isPublic: false,
    allowDownload: true,
    expiresAt: null
  });

  useEffect(() => {
    if (isOpen && chartId) {
      loadShareSettings();
    }
  }, [isOpen, chartId]);

  const loadShareSettings = async () => {
    try {
      const data = await shareService.getShareSettings(chartId);
      setSettings(data.settings);
      setShareLink(data.shareLink);
    } catch (error) {
      console.error('加载分享设置失败:', error);
      toast.error('加载分享设置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('链接已复制到剪贴板');
    } catch (error) {
      toast.error('复制失败');
    }
  };

  const handleUpdateSettings = async () => {
    setLoading(true);
    try {
      const data = await shareService.updateShareSettings(chartId, settings);
      setSettings(data.settings);
      setShareLink(data.shareLink);
      toast.success('分享设置已更新');
    } catch (error) {
      toast.error('更新设置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(shareLink);
    const text = encodeURIComponent('查看我的数据图表');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            分享图表
          </Dialog.Title>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 分享链接 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分享链接
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* 分享设置 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {settings.isPublic ? (
                      <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-2" />
                    ) : (
                      <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      公开访问
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setSettings({ ...settings, isPublic: !settings.isPublic })
                    }
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
                      settings.isPublic ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        settings.isPublic ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    允许下载
                  </span>
                  <button
                    onClick={() =>
                      setSettings({
                        ...settings,
                        allowDownload: !settings.allowDownload
                      })
                    }
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
                      settings.allowDownload ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        settings.allowDownload ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    链接有效期
                  </label>
                  <select
                    value={settings.expiresAt || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        expiresAt: e.target.value || null
                      })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">永久有效</option>
                    <option value="1d">1天</option>
                    <option value="7d">7天</option>
                    <option value="30d">30天</option>
                  </select>
                </div>
              </div>

              {/* 社交分享 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  分享到社交媒体
                </h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ShareIcon className="h-5 w-5 mr-2" />
                    分享到 X
                  </button>
                  <button
                    onClick={() => handleSocialShare('linkedin')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ShareIcon className="h-5 w-5 mr-2" />
                    分享到 LinkedIn
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={handleUpdateSettings}
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? '保存中...' : '保存设置'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ShareDialog; 