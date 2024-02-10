const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;