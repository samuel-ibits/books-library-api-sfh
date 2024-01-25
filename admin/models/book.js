// models/book.js
import mongoose from "mongoose";
mongoose.set('useCreateIndex', true); // Optional, to suppress the deprecation warning

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  category: String,
  isAvailable: { type: Boolean, default: true },
  dueDate: Date,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
