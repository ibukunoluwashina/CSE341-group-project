const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genre");

router
  .get("/", genreController.getAllGenres)
  .get("/:id", genreController.getSingleGenre)
  .post("/", genreController.createGenre)
  .put("/:id", genreController.updateGenre)
  .delete("/:id", genreController.deleteGenre);

module.exports = router;
