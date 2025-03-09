import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const chartService = {
  // 保存图表
  async saveChart(chartData) {
    const response = await axios.post(`${API_URL}/charts`, chartData);
    return response.data;
  },

  // 获取用户的图表列表
  async getCharts() {
    const response = await axios.get(`${API_URL}/charts`);
    return response.data;
  },

  // 获取单个图表详情
  async getChart(id) {
    const response = await axios.get(`${API_URL}/charts/${id}`);
    return response.data;
  },

  // 更新图表
  async updateChart(id, chartData) {
    const response = await axios.put(`${API_URL}/charts/${id}`, chartData);
    return response.data;
  },

  // 删除图表
  async deleteChart(id) {
    const response = await axios.delete(`${API_URL}/charts/${id}`);
    return response.data;
  },

  // 处理CSV文件
  async processCSV(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/charts/process-csv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 导出图表
  async exportChart(id, format) {
    const response = await axios.get(`${API_URL}/charts/${id}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },
};

export default chartService;