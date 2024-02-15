const express = require("express");
const router = express.Router();
const booksController = require("../controllers/book");

const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router
  .get("/", booksController.getAllBooks)
  .get("/:id", booksController.getSingleBook)
  .post("/", isAuthenticated, booksController.createBook)
  .put("/:id", isAuthenticated, booksController.updateBook)
  .delete("/:id", isAuthenticated, booksController.deleteBook);

module.exports = router;
