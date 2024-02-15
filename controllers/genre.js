const ObjectId = require("mongodb").ObjectId;
const Genre = require("../model/genre");

const getAllGenres = async (req, res) => {
  console.log("Get all genres route working");
  try {
    const genres = await Genre.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleGenre = async (req, res) => {
  console.log("Get genre by ID route working");
  try {
    const genreId = req.params.id;
    if (!ObjectId.isValid(genreId)) {
      console.log("Invalid genre ID:", genreId);
      return res.status(400).json("Invalid genre ID");
    }

    console.log("Searching for genre with ID:", genreId);
    const genre = await Genre.findById(genreId);

    if (!genre) {
      console.log("Genre not found for ID:", genreId);
      return res.status(404).json("Genre not found");
    }

    res.status(200).json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createGenre = async (req, res) => {
  console.log("Create genre route working");
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      console.log("Required fields are missing");
      return res.status(400).json("Required fields are missing");
    }

    const genre = new Genre({
      name,
      description,      
    });
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    console.error("Error creating genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateGenre = async (req, res) => {
  console.log("Update genre route working");
  try {
    const genreId = req.params.id;
    if (!ObjectId.isValid(genreId)) {
      console.log("Invalid genre ID:", genreId);
      return res.status(400).json("Invalid genre ID");
    }

    console.log("Searching for genre with ID:", genreId);
    const genre = await Genre.findById(genreId);

    if (!genre) {
      console.log("Genre not found for ID:", genreId);
      return res.status(404).json("Genre not found");
    }

    const { name, description } = req.body;
    if (name) genre.name = name;
    if (description) genre.description = description;

    await genre.save();

    res.status(200).json(genre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteGenre = async (req, res) => {
  console.log("Delete genre route working");
  try {
    const genreId = req.params.id;
    if (!ObjectId.isValid(genreId)) {
      console.log("Invalid genre ID:", genreId);
      return res.status(400).json("Invalid genre ID");
    }

    console.log("Searching for genre with ID:", genreId);
    const genre = await Genre.findById(genreId);

    if (!genre) {
      console.log("Genre not found for ID:", genreId);
      return res.status(404).json("Genre not found");
    }

    await genre.delete();

    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
