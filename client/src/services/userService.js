import api from './authService';

// 更新用户信息
export const updateUser = async (userData) => {
  try {
    const response = await api.put('/users/me', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '更新用户信息失败' };
  }
};

// 更新密码
export const updatePassword = async (passwordData) => {
  try {
    const response = await api.put('/users/password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '更新密码失败' };
  }
}; 