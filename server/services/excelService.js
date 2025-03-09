const xlsx = require('xlsx');

exports.processExcelFile = async (filePath) => {
  // 读取 Excel 文件
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // 转换为 JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
  if (jsonData.length === 0) {
    throw new Error('Excel 文件为空');
  }
  
  // 提取标签和数据
  const labels = Object.keys(jsonData[0]);
  const categoryField = labels[0]; // 第一列作为类别
  
  // 准备数据集
  const datasets = labels.slice(1).map(label => {
    return {
      label,
      data: jsonData.map(row => parseFloat(row[label]) || 0),
      backgroundColor: generateRandomColors(jsonData.length),
      borderColor: generateRandomColors(jsonData.length),
      borderWidth: 1
    };
  });
  
  return {
    labels: jsonData.map(row => row[categoryField]),
    datasets
  };
};

// 生成随机颜色
function generateRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`);
  }
  return colors;
} 