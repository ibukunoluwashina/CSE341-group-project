const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  booksPublished: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
