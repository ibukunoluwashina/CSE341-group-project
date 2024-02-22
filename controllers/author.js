const ObjectId = require("mongodb").ObjectId;
const Author = require("../model/author");

const getAllAuthors = async (req, res) => {
  // #swagger.tags=['Author']
  try {
    const authors = await Author.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleAuthor = async (req, res) => {
  // #swagger.tags=['Users']
  try {
    const authorId = new ObjectId(req.params.id);
    const author = await User.findOne({ _id: authorId });

    if (author) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(author);
    } else {
      res.status(404).json("Author not found");
    }
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json("Internal Server Error");
  }
};

const creatAuthor = async (req, res) => {
  // #swagger.tags=['Author']
  const { userId, booksPublished } = req.body;
  try {
    const author = new Author({
      userId,
      booksPublished,
    });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json("Internal Server Error");
  }
};

const updateAuthor = async (req, res) => {
  // #swagger.tags=['Author']
  try {
    const authorId = req.params.id;
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({ error: "Invalid author ID" });
    }

    const updatedAuthor = await Author.findOneAndUpdate(
      { _id: authorId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json("Author not found");
    }

    res.status(200).json({ message: "Author updated successfully", author: updatedAuthor });
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteAuthor = async (req, res) => {
  // #swagger.tags=['Author']
  try {
    const authorId = req.params.id;
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json("Invalid author ID");
    }

    const deletedAuthor = await Author.findByIdAndDelete(authorId);

    if (!deletedAuthor) {
      return res.status(404).json("Author not found");
    }

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getAllAuthors,
  getSingleAuthor,
  creatAuthor,
  updateAuthor,
  deleteAuthor,
};
