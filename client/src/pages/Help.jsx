import React from 'react';
import Layout from '../components/Layout';
import {
  QuestionMarkCircleIcon,
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const Help = () => {
  const helpSections = [
    {
      title: '快速入门',
      icon: BookOpenIcon,
      items: [
        { title: '创建第一个图表', link: '#' },
        { title: '导入数据', link: '#' },
        { title: '自定义图表样式', link: '#' },
        { title: '导出和分享', link: '#' },
      ],
    },
    {
      title: '视频教程',
      icon: VideoCameraIcon,
      items: [
        { title: '基础功能介绍', link: '#' },
        { title: '高级图表定制', link: '#' },
        { title: '数据处理技巧', link: '#' },
        { title: '协作与分享', link: '#' },
      ],
    },
    {
      title: '常见问题',
      icon: QuestionMarkCircleIcon,
      items: [
        { title: '支持哪些数据格式？', link: '#' },
        { title: '如何更改图表类型？', link: '#' },
        { title: '如何自定义颜色？', link: '#' },
        { title: '导出格式说明', link: '#' },
      ],
    },
    {
      title: '联系支持',
      icon: ChatBubbleLeftRightIcon,
      items: [
        { title: '提交问题', link: '#' },
        { title: '功能建议', link: '#' },
        { title: '在线客服', link: '#' },
        { title: '反馈中心', link: '#' },
      ],
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">帮助中心</h1>
          <p className="mt-1 text-sm text-gray-500">
            了解如何使用 ChartMaster 创建专业的数据可视化图表
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {helpSections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <section.icon className="h-6 w-6 text-blue-500 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.link}
                        className="text-sm text-gray-600 hover:text-blue-500 flex items-center"
                      >
                        <span className="h-1 w-1 bg-gray-400 rounded-full mr-2"></span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Help; 