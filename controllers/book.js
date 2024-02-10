const ObjectId = require("mongodb").ObjectId;
const Book = require("../model/book");

const createBook = async (req, res) => {
  // #swagger.tags=['books']
  console.log("Create book route working");
  try {
    const { title, authorId, genre, publicationYear, isbn } = req.body;
    // Validate authorId format
    if (!ObjectId.isValid(authorId)) {
      console.log("Invalid author ID:", authorId);
      return res.status(400).json("Invalid author ID");
    }
    // Validate publicationYear format
    if (!isValidPublicationYear(publicationYear)) {
      console.log("Invalid publication year:", publicationYear);
      return res.status(400).json("Invalid publication year");
    }
    // Check required fields
    if (!title || !genre || !isbn) {
      console.log("Required fields are missing");
      return res.status(400).json("Required fields are missing");
    }

    const book = await new Book({
      title,
      authorId,
      genre,
      publicationYear,
      isbn,
      createdAt: Date.now(),
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  // #swagger.tags=['books']
  console.log("Get book by ID route working");
  try {
    const bookId = req.params.id; // Corrected variable name to bookId
    // Validate bookId format
    if (!ObjectId.isValid(bookId)) {
      console.log("Invalid book ID:", bookId);
      return res.status(400).json("Invalid book ID");
    }

    console.log("Searching for book with ID:", bookId);
    const book = await Book.findById(bookId);

    if (!book) {
      console.log("Book not found for ID:", bookId);
      return res.status(404).json("Book not found");
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
  // #swagger.tags=['books']
  console.log("Update book route working");
  try {
    const bookId = req.params.id; // Corrected variable name to bookId
    // Validate bookId format
    if (!ObjectId.isValid(bookId)) {
      console.log("Invalid book ID:", bookId);
      return res.status(400).json("Invalid book ID");
    }

    console.log("Searching for book with ID:", bookId);
    const book = await Book.findById(bookId);

    if (!book) {
      console.log("Book not found for ID:", bookId);
      return res.status(404).json("Book not found");
    }

    // Update book fields
    const { title, authorId, genre, publicationYear, isbn } = req.body;
    if (title) book.title = title;
    if (authorId) book.authorId = authorId;
    if (genre) book.genre = genre;
    if (publicationYear) {
      // Validate publicationYear format
      if (!isValidPublicationYear(publicationYear)) {
        console.log("Invalid publication year:", publicationYear);
        return res.status(400).json("Invalid publication year");
      }
      book.publicationYear = publicationYear;
    }
    if (isbn) book.isbn = isbn;

    // Save updated book
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  // #swagger.tags=['books']
  console.log("Delete book route working");
  try {
    const bookId = req.params.id; // Corrected variable name to bookId
    // Validate bookId format
    if (!ObjectId.isValid(bookId)) {
      console.log("Invalid book ID:", bookId);
      return res.status(400).json("Invalid book ID");
    }

    console.log("Searching for book with ID:", bookId);
    const book = await Book.findById(bookId);

    if (!book) {
      console.log("Book not found for ID:", bookId);
      return res.status(404).json("Book not found");
    }

    // Delete book
    await book.delete();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBooks = async (req, res) => {
  console.log("Get all books route working");
  try {
    const books = await Book.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
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
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getAllBooks,
};
