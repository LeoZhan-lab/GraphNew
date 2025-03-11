import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const templateService = {
  // 获取模板列表
  async getTemplates() {
    const response = await axios.get(`${API_URL}/templates`);
    return response.data;
  },

  // 获取单个模板
  async getTemplate(id) {
    const response = await axios.get(`${API_URL}/templates/${id}`);
    return response.data;
  },

  // 从模板创建图表
  async createFromTemplate(templateId) {
    const response = await axios.post(`${API_URL}/charts/from-template/${templateId}`);
    return response.data;
  }
};

export default templateService; 