import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

const ChartPreview = ({ type = 'bar', data, options }) => {
  const chartRef = useRef(null);

  const defaultData = {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(201, 203, 207, 0.5)'
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(255, 99, 132)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ]
  };

  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '图表标题'
      }
    }
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data || defaultData} options={options || defaultOptions} />;
      case 'line':
        return <Line data={data || defaultData} options={options || defaultOptions} />;
      case 'pie':
        return <Pie data={data || defaultData} options={options || defaultOptions} />;
      case 'doughnut':
        return <Doughnut data={data || defaultData} options={options || defaultOptions} />;
      default:
        return <Bar data={data || defaultData} options={options || defaultOptions} />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="aspect-w-16 aspect-h-9">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartPreview; 