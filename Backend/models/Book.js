// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available'
  }
});

module.exports = mongoose.model('Book', bookSchema);
