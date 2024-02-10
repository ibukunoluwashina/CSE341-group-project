const express = require('express');
const router = express.Router();

const authorController = require('../controllers/author');

router.get('/', authorController.getAll);
router.get('/:id', authorController.getSingle);
router.post('/', authorController.creatAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
