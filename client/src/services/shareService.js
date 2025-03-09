import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const shareService = {
  // 生成分享链接
  async generateShareLink(chartId) {
    const response = await axios.post(`${API_URL}/charts/${chartId}/share`);
    return response.data;
  },

  // 获取分享设置
  async getShareSettings(chartId) {
    const response = await axios.get(`${API_URL}/charts/${chartId}/share`);
    return response.data;
  },

  // 更新分享设置
  async updateShareSettings(chartId, settings) {
    const response = await axios.put(`${API_URL}/charts/${chartId}/share`, settings);
    return response.data;
  },

  // 导出图表为图片
  async exportAsImage(chartId, format = 'png') {
    const response = await axios.get(`${API_URL}/charts/${chartId}/export/image`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  }
};

export default shareService; 