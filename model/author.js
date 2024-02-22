const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  booksPublished: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
