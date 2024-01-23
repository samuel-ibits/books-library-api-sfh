// models/book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  category: String,
  isAvailable: { type: Boolean, default: true },
  dueDate: Date,
});

module.exports = mongoose.model("Book", bookSchema);
