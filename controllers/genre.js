const ObjectId = require("mongodb").ObjectId;
const Genre = require("../model/genre");

const getAllGenres = async (req, res) => {
  // #swagger.tags=['Genre']
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
  // #swagger.tags=['Genre']
  try {
    const genreId = req.params.id;
    if (!ObjectId.isValid(genreId)) {
      return res.status(400).json("Invalid genre ID");
    }

    const genre = await Genre.findById(genreId);

    if (!genre) {
      return res.status(404).json("Genre not found");
    }

    res.status(200).json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const createGenre = async (req, res) => {
  // #swagger.tags=['Genre']
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json("Required fields are missing");
    }

    const genre = new Genre({
      name: req.body.name,
      description: req.body.description,
    });

    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateGenre = async (req, res) => {
  // #swagger.tags=['Genre']
  try {
    const genreId = req.params.id;
    if (!ObjectId.isValid(genreId)) {
      return res.status(400).json("Invalid genre ID");
    }

    const genre = await Genre.findByIdAnd(genreId);

    if (!genre) {
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
  // #swagger.tags=['Users']
  const genreId = new ObjectId(req.params.id);
  const response = await Genre.findByIdAndDelete({ _id: genreId });

  if (response) {
    return res.status(204).send();
  } else {
    res.status(404).json("Genre not found for deletion");
  }
};

module.exports = {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
