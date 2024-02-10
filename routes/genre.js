const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre');

// Routes for Genre endpoints
router.post('/', genreController.createGenre);
router.get('/:id', genreController.getGenreById);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
