const mongoose = require('mongoose');

const ChartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['bar', 'line', 'pie', 'doughnut', 'scatter', 'bubble', 'radar', 'polarArea']
  },
  data: {
    labels: [String],
    datasets: [{
      label: String,
      data: [Number],
      backgroundColor: [String],
      borderColor: [String],
      borderWidth: Number
    }]
  },
  options: {
    type: Object,
    default: {}
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 更新时间中间件
ChartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Chart', ChartSchema); 