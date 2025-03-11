import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5001/api';

// 创建新图表
export const createChart = async (chartData) => {
  try {
    const response = await axios.post(`${API_URL}/charts`, chartData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '创建图表失败' };
  }
};

// 获取图表详情
export const getChart = async (chartId) => {
  try {
    const response = await axios.get(`${API_URL}/charts/${chartId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '获取图表失败' };
  }
};

// 更新图表
export const updateChart = async (chartId, chartData) => {
  try {
    const response = await axios.put(`${API_URL}/charts/${chartId}`, chartData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '更新图表失败' };
  }
};

// 删除图表
export const deleteChart = async (chartId) => {
  try {
    const response = await axios.delete(`${API_URL}/charts/${chartId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '删除图表失败' };
  }
};

// 获取用户的所有图表
export const getUserCharts = async () => {
  try {
    const response = await axios.get(`${API_URL}/charts`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '获取图表列表失败' };
  }
};

// 导出图表为图片
export const exportChartAsImage = async (chartId, format = 'png') => {
  try {
    const response = await axios.get(`${API_URL}/charts/${chartId}/export`, {
      params: { format },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '导出图表失败' };
  }
};

// 导入数据
export const importChartData = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/charts/import`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '导入数据失败' };
  }
};

// 获取图表模板
export const getChartTemplates = async () => {
  try {
    const response = await axios.get(`${API_URL}/templates`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '获取模板失败' };
  }
};

// 从模板创建图表
export const createChartFromTemplate = async (templateId, chartData) => {
  try {
    const response = await axios.post(`${API_URL}/charts/template/${templateId}`, chartData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '从模板创建图表失败' };
  }
};

// 保存图表为模板
export const saveAsTemplate = async (chartId, templateData) => {
  try {
    const response = await axios.post(`${API_URL}/templates`, {
      chartId,
      ...templateData
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '保存为模板失败' };
  }
};