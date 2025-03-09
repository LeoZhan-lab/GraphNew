const Chart = require('../models/Chart');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { processExcelFile } = require('../services/excelService');

// 获取用户所有图表
exports.getUserCharts = async (req, res) => {
  try {
    const charts = await Chart.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(charts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取单个图表
exports.getChart = async (req, res) => {
  try {
    const chart = await Chart.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!chart) {
      return res.status(404).json({ message: '图表不存在' });
    }
    
    res.json(chart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 创建图表
exports.createChart = async (req, res) => {
  try {
    const { title, description, type, data, options, isPublic } = req.body;
    
    const chart = new Chart({
      user: req.user._id,
      title,
      description,
      type,
      data,
      options,
      isPublic
    });
    
    await chart.save();
    res.status(201).json(chart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新图表
exports.updateChart = async (req, res) => {
  try {
    const { title, description, type, data, options, isPublic } = req.body;
    
    const chart = await Chart.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!chart) {
      return res.status(404).json({ message: '图表不存在' });
    }
    
    chart.title = title || chart.title;
    chart.description = description || chart.description;
    chart.type = type || chart.type;
    chart.data = data || chart.data;
    chart.options = options || chart.options;
    chart.isPublic = isPublic !== undefined ? isPublic : chart.isPublic;
    
    await chart.save();
    res.json(chart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 删除图表
exports.deleteChart = async (req, res) => {
  try {
    const chart = await Chart.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!chart) {
      return res.status(404).json({ message: '图表不存在' });
    }
    
    await chart.remove();
    res.json({ message: '图表已删除' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 从 CSV 导入数据
exports.importFromCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '请上传 CSV 文件' });
    }
    
    const results = [];
    
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // 清理临时文件
        fs.unlinkSync(req.file.path);
        
        if (results.length === 0) {
          return res.status(400).json({ message: 'CSV 文件为空' });
        }
        
        // 处理数据
        const labels = Object.keys(results[0]);
        const categoryField = labels[0]; // 第一列作为类别
        
        const datasets = labels.slice(1).map(label => ({
          label,
          data: results.map(row => parseFloat(row[label]) || 0),
          backgroundColor: generateRandomColors(results.length),
          borderColor: generateRandomColors(results.length),
          borderWidth: 1
        }));
        
        res.json({
          labels: results.map(row => row[categoryField]),
          datasets
        });
      })
      .on('error', (error) => {
        console.error(error);
        res.status(500).json({ message: '处理 CSV 文件时出错' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 从 Excel 导入数据
exports.importFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '请上传 Excel 文件' });
    }
    
    const data = await processExcelFile(req.file.path);
    
    // 清理临时文件
    fs.unlinkSync(req.file.path);
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 生成随机颜色
function generateRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`);
  }
  return colors;
} 