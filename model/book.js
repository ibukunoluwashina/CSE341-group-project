const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Author' },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isbn: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;