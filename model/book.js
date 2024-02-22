const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: String, required: true },
  genreId: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  isbn: { type: String, required: true },
  isAvailable: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
