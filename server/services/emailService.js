const nodemailer = require('nodemailer');

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 发送密码重置邮件
exports.sendPasswordResetEmail = async (email, resetUrl) => {
  console.log('发送密码重置邮件到:', email);
  console.log('重置链接:', resetUrl);
  // 在开发环境中，我们只打印邮件内容而不实际发送
}; 