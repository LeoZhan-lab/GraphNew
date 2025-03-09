const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 创建测试账号的路由
router.post('/create-test-account', async (req, res) => {
  try {
    // 检查是否已存在测试用户
    let user = await User.findOne({ email: 'test@example.com' });
    
    if (user) {
      // 如果用户已存在，返回成功信息
      return res.json({ 
        message: '测试账号已存在',
        user: {
          email: 'test@example.com',
          password: '123456'
        }
      });
    }

    // 创建新的测试用户
    const hashedPassword = await bcrypt.hash('123456', 10);
    user = new User({
      name: '测试用户',
      email: 'test@example.com',
      password: hashedPassword
    });

    await user.save();

    res.json({ 
      message: '测试账号创建成功',
      user: {
        email: 'test@example.com',
        password: '123456'
      }
    });
  } catch (error) {
    console.error('创建测试账号失败:', error);
    res.status(500).json({ message: '创建测试账号失败' });
  }
});

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 检查是否已存在用户
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    // 创建新用户
    const user = new User({
      name,
      email,
      password // 密码会在 User model 的 pre save 中间件中自动加密
    });

    await user.save();

    // 生成 JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '1d' }
    );

    // 返回用户信息和 token
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ message: '注册失败，请稍后重试' });
  }
});

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/me', auth, authController.getCurrentUser);

module.exports = router; 