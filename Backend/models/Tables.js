const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  customers: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;