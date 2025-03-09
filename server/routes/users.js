const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// 所有路由都需要认证
router.use(auth);

// 获取当前用户
router.get('/me', userController.getCurrentUser);

// 更新用户信息
router.put('/me', userController.updateUser);

// 更新密码
router.put('/password', userController.updatePassword);

module.exports = router; 