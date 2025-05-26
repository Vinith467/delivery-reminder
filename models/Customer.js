const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  status: {
    type: String,
    enum: ['Ready', 'Delivered'],
    default: 'Ready'
  },
  lastCalledAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Customer', customerSchema);
