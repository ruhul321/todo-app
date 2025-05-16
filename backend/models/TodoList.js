const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [todoItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TodoList', todoListSchema);
