const ObjectId = require("mongodb").ObjectId;
const Book = require("../model/book");

const getAllBooks = async (req, res) => {
  // #swagger.tags=['Book']
  try {
    const books = await Book.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleBook = async (req, res) => {
  // #swagger.tags=['Book']
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json("Invalid book ID");
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json("Book not found");
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBook = async (req, res) => {
  // #swagger.tags=['Book']
  try {
    const { title, authorId, genreId, publicationYear, isbn } = req.body;
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json("Invalid author ID");
    }
    if (!ObjectId.isValid(genreId)) {
      return res.status(400).json("Invalid genre ID");
    }
    if (!isValidPublicationYear(publicationYear)) {
      return res.status(400).json("Invalid publication year");
    }
    if (!title || !isbn) {
      return res.status(400).json("Required fields are missing");
    }

    const book = new Book({
      title,
      authorId,
      genreId,
      publicationYear,
      isbn,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
  // #swagger.tags=['Book']
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json("Invalid book ID");
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json("Book not found");
    }

    const { title, authorId, genreId, publicationYear, isbn } = req.body;
    if (title) book.title = title;
    if (authorId) book.authorId = authorId;
    if (genreId) book.genreId = genreId;
    if (publicationYear) {
      if (!isValidPublicationYear(publicationYear)) {
        console.log("Invalid publication year:", publicationYear);
        return res.status(400).json("Invalid publication year");
      }
      book.publicationYear = publicationYear;
    }
    if (isbn) book.isbn = isbn;

    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  // #swagger.tags=['Book']
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json("Invalid book ID");
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json("Book not found");
    }

    await book.delete();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to validate publicationYear format
function isValidPublicationYear(publicationYear) {
  // Regular expression for publication year validation (4 digits)
  const yearRegex = /^\d{4}$/;
  return yearRegex.test(publicationYear);
}

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
