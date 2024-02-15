const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Genre",
  },
  publicationYear: { type: Number, required: true },
  isbn: { type: String, required: true, unique: true },
  availability: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
