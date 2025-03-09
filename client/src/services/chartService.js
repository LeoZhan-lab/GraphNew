import api from './authService';

// 获取用户所有图表
export const getUserCharts = async () => {
  try {
    const response = await api.get('/charts');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '获取图表失败' };
  }
};

// 获取单个图表
export const getChart = async (id) => {
  try {
    const response = await api.get(`/charts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '获取图表失败' };
  }
};

// 创建图表
export const createChart = async (chartData) => {
  try {
    const response = await api.post('/charts', chartData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '创建图表失败' };
  }
};

// 更新图表
export const updateChart = async (id, chartData) => {
  try {
    const response = await api.put(`/charts/${id}`, chartData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '更新图表失败' };
  }
};

// 删除图表
export const deleteChart = async (id) => {
  try {
    const response = await api.delete(`/charts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '删除图表失败' };
  }
};

// 从 CSV 导入数 
export const importFromCSV = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/charts/import/csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '导入 CSV 数据失败' };
    }
  };
  
  // 从 Excel 导入数据
  export const importFromExcel = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/charts/import/excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '导入 Excel 数据失败' };
    }
  };