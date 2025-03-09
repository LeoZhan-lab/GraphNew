const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// 所有路由都需要认证
router.use(auth);

// 获取用户所有图表
router.get('/', chartController.getUserCharts);

// 获取单个图表
router.get('/:id', chartController.getChart);

// 创建图表
router.post('/', chartController.createChart);

// 更新图表
router.put('/:id', chartController.updateChart);

// 删除图表
router.delete('/:id', chartController.deleteChart);

// 从 CSV 导入数据
router.post('/import/csv', upload.single('file'), chartController.importFromCSV);

// 从 Excel 导入数据
router.post('/import/excel', upload.single('file'), chartController.importFromExcel);

module.exports = router; 