const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function createInitialUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // 检查是否已存在测试用户
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('测试用户已存在');
      return;
    }

    // 创建新用户
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = new User({
      name: '测试用户',
      email: 'test@example.com',
      password: hashedPassword
    });

    await user.save();
    console.log('测试用户创建成功');
  } catch (error) {
    console.error('创建用户失败:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createInitialUser(); 