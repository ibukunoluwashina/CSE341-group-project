const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");

router
  .get("/", authorController.getAllAuthors)
  .get("/:id", authorController.getSingleAuthor)
  .post("/", authorController.creatAuthor)
  .put("/:id", authorController.updateAuthor)
  .delete("/:id", authorController.deleteAuthor);

module.exports = router;
