const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// 路由导入
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chartRoutes = require('./routes/charts');

// 配置环境变量
dotenv.config();

const app = express();

// CORS 配置
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 解析 JSON 请求体
app.use(express.json());

// 创建上传目录
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 数据库连接
mongoose.connect('mongodb://127.0.0.1:27017/chartmaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB 连接成功');
  console.log('数据库 URL:', mongoose.connection.host);
})
.catch(err => {
  console.error('MongoDB 连接错误:', err);
  process.exit(1); // 如果数据库连接失败，终止服务器
});

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/charts', chartRoutes);

// 添加测试路由
app.get('/api/test', (req, res) => {
  res.json({ message: '后端服务器正常运行' });
});

// 添加更详细的错误处理
app.use((err, req, res, next) => {
  console.error('错误详情:', err);
  res.status(500).json({ 
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`服务器运行在端口 ${PORT}`)); 