import React, { useState } from 'react';
import Layout from '../components/Layout';
import { UserCircleIcon, KeyIcon, BellIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: 实现设置更新逻辑
      setNotification({ type: 'success', message: '设置已更新' });
    } catch (error) {
      setNotification({ type: 'error', message: '更新失败' });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: '个人资料', icon: UserCircleIcon },
    { id: 'security', name: '安全设置', icon: KeyIcon },
    { id: 'notifications', name: '通知设置', icon: BellIcon },
    { id: 'appearance', name: '外观设置', icon: Squares2X2Icon },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">用户设置</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理您的账户设置和偏好
          </p>
        </div>

        {notification && (
          <div
            className={`mb-4 p-4 rounded-md ${
              notification.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <p
              className={`text-sm ${
                notification.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {notification.message}
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-500 border-b-2 border-transparent'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mx-auto mb-1" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    用户名
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    邮箱
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    个人简介
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? '保存中...' : '保存更改'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    当前密码
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    新密码
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? '更新中...' : '更新密码'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        电子邮件通知
                      </h3>
                      <p className="text-sm text-gray-500">
                        接收关于您的图表和账户的电子邮件更新
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        浏览器通知
                      </h3>
                      <p className="text-sm text-gray-500">
                        在浏览器中接收实时通知
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? '保存中...' : '保存设置'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    主题设置
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="aspect-w-16 aspect-h-9 bg-white border-2 border-blue-500 rounded-lg overflow-hidden">
                      <div className="p-2">
                        <div className="h-2 w-full bg-blue-500 rounded mb-2"></div>
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                      </div>
                    </button>
                    <button className="aspect-w-16 aspect-h-9 bg-gray-900 border-2 border-transparent rounded-lg overflow-hidden">
                      <div className="p-2">
                        <div className="h-2 w-full bg-blue-500 rounded mb-2"></div>
                        <div className="h-2 w-3/4 bg-gray-700 rounded"></div>
                      </div>
                    </button>
                    <button className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-transparent rounded-lg overflow-hidden">
                      <div className="p-2">
                        <div className="h-2 w-full bg-white rounded mb-2"></div>
                        <div className="h-2 w-3/4 bg-white/50 rounded"></div>
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? '保存中...' : '保存设置'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserSettings; 