const express = require("express");
const router = express.Router();
const booksController = require("../controllers/book");

router
  .get("/", booksController.getAllBooks)
  .get("/:id", booksController.getSingleBook)
  .post("/", booksController.createBook)
  .put("/:id", booksController.updateBook)
  .delete("/:id", booksController.deleteBook);

module.exports = router;
