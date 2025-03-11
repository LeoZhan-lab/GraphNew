import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const userService = {
  // 更新用户资料
  async updateProfile(userData) {
    const response = await axios.put(`${API_URL}/users/profile`, userData);
    return response.data;
  },

  // 更新密码
  async updatePassword(passwordData) {
    const response = await axios.put(`${API_URL}/users/password`, passwordData);
    return response.data;
  },

  // 更新通知设置
  async updateNotificationSettings(settings) {
    const response = await axios.put(`${API_URL}/users/notifications`, settings);
    return response.data;
  },

  // 更新主题设置
  async updateTheme(theme) {
    const response = await axios.put(`${API_URL}/users/theme`, { theme });
    return response.data;
  },

  // 获取用户设置
  async getSettings() {
    const response = await axios.get(`${API_URL}/users/settings`);
    return response.data;
  },
};

export default userService; 