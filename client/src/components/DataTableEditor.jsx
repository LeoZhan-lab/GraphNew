import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const DataTableEditor = ({ data, onChange }) => {
  const [labels, setLabels] = useState(data?.labels || []);
  const [datasets, setDatasets] = useState(data?.datasets || []);

  const handleLabelChange = (index, value) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    updateData(newLabels, datasets);
  };

  const handleDataChange = (datasetIndex, labelIndex, value) => {
    try {
      const newValue = parseFloat(value);
      if (isNaN(newValue)) return;

      const newDatasets = [...datasets];
      newDatasets[datasetIndex] = {
        ...newDatasets[datasetIndex],
        data: newDatasets[datasetIndex].data.map((d, i) => 
          i === labelIndex ? newValue : d
        )
      };
      updateData(labels, newDatasets);
    } catch (error) {
      toast.error('请输入有效的数字');
    }
  };

  const handleDatasetLabelChange = (index, value) => {
    const newDatasets = [...datasets];
    newDatasets[index] = {
      ...newDatasets[index],
      label: value
    };
    updateData(labels, newDatasets);
  };

  const addLabel = () => {
    const newLabels = [...labels, `数据 ${labels.length + 1}`];
    const newDatasets = datasets.map(ds => ({
      ...ds,
      data: [...ds.data, 0]
    }));
    updateData(newLabels, newDatasets);
  };

  const addDataset = () => {
    const newDataset = {
      label: `系列 ${datasets.length + 1}`,
      data: new Array(labels.length).fill(0),
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      borderWidth: 1
    };
    updateData(labels, [...datasets, newDataset]);
  };

  const removeLabel = (index) => {
    const newLabels = labels.filter((_, i) => i !== index);
    const newDatasets = datasets.map(ds => ({
      ...ds,
      data: ds.data.filter((_, i) => i !== index)
    }));
    updateData(newLabels, newDatasets);
  };

  const removeDataset = (index) => {
    const newDatasets = datasets.filter((_, i) => i !== index);
    updateData(labels, newDatasets);
  };

  const updateData = (newLabels, newDatasets) => {
    setLabels(newLabels);
    setDatasets(newDatasets);
    onChange({
      labels: newLabels,
      datasets: newDatasets
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  标签
                </th>
                {datasets.map((dataset, index) => (
                  <th key={index} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={dataset.label}
                        onChange={(e) => handleDatasetLabelChange(index, e.target.value)}
                        className="block w-full rounded-md border-0 bg-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      />
                      <button
                        onClick={() => removeDataset(index)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <button
                    onClick={addDataset}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {labels.map((label, labelIndex) => (
                <tr key={labelIndex}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={label}
                        onChange={(e) => handleLabelChange(labelIndex, e.target.value)}
                        className="block rounded-md border-0 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      />
                      <button
                        onClick={() => removeLabel(labelIndex)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  {datasets.map((dataset, datasetIndex) => (
                    <td key={datasetIndex} className="whitespace-nowrap px-3 py-4 text-sm">
                      <input
                        type="number"
                        value={dataset.data[labelIndex]}
                        onChange={(e) => handleDataChange(datasetIndex, labelIndex, e.target.value)}
                        className="block w-full rounded-md border-0 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      />
                    </td>
                  ))}
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* 添加行按钮 */}
          <div className="px-4 py-3 bg-gray-700">
            <button
              onClick={addLabel}
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              添加行
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableEditor;