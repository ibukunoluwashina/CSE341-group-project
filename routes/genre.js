const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genre");

const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router
  .get("/", genreController.getAllGenres)
  .get("/:id", genreController.getSingleGenre)
  .post(
    "/",
    validation.storeGenre,
    isAuthenticated,
    genreController.createGenre
  )
  .put(
    "/:id",
    validation.storeGenre,
    isAuthenticated,
    genreController.updateGenre
  )
  .delete("/:id", isAuthenticated, genreController.deleteGenre);

module.exports = router;
