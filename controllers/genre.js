const Genre = require("../model/genre");

const createGenre = async (req, res) => {
  // #swagger.tags=['genres']
  console.log("Create genre route working");
  try {
    const { name, description } = req.body;
    // Check required fields
    if (!name || !description) {
      console.log("Required fields are missing");
      return res.status(400).json("Required fields are missing");
    }

    const genre = await new Genre({
      name,
      description,
      createdAt: Date.now(),
    });
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    console.error("Error creating genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGenreById = async (req, res) => {
  // #swagger.tags=['genres']
  console.log("Get genre by ID route working");
  try {
    const genreId = req.params.id; // Corrected variable name to genreId
    // Validate genreId format
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

const updateGenre = async (req, res) => {
  // #swagger.tags=['genres']
  console.log("Update genre route working");
  try {
    const genreId = req.params.id; // Corrected variable name to genreId
    // Validate genreId format
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

    // Update genre fields
    const { name, description } = req.body;
    if (name) genre.name = name;
    if (description) genre.description = description;

    // Save updated genre
    await genre.save();

    res.status(200).json(genre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteGenre = async (req, res) => {
  // #swagger.tags=['genres']
  console.log("Delete genre route working");
  try {
    const genreId = req.params.id; // Corrected variable name to genreId
    // Validate genreId format
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

    // Delete genre
    await genre.delete();

    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
};
