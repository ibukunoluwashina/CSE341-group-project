const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");

const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router
  .get("/", authorController.getAllAuthors)
  .get("/:id", authorController.getSingleAuthor)
  .post(
    "/",
    validation.storeAuthor,
    isAuthenticated,
    authorController.creatAuthor
  )
  .put(
    "/:id",
    validation.storeAuthor,
    isAuthenticated,
    authorController.updateAuthor
  )
  .delete("/:id", isAuthenticated, authorController.deleteAuthor);

module.exports = router;
