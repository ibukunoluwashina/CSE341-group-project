const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book');

// GET all books
router.get('/', booksController.getAllBooks);

// GET a book by ID
router.get('/:id', booksController.getBookById);

// POST create a new book
router.post('/', booksController.createBook);

// PUT update a book by ID
router.put('/:id', booksController.updateBook);

// DELETE delete a book by ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
