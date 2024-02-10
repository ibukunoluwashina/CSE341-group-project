const ObjectId = require("mongodb").ObjectId;
const Author = require("../model/author");

const getAll = async (req, res) => {
  console.log("Get all route working");
  // #swagger.tags=['users']
  try {
    const authors = await Author.find(); // Corrected variable name to authors
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors); // Send authors data as JSON response
  } catch (error) {
    console.error("Error fetching authors:", error); // Corrected error message
    res.status(500).json({ error: "Internal Server Error" }); // Send appropriate error response
  }
}; 

const getSingle = async (req, res) => {
  // #swagger.tags=['users']
  console.log("Get single route working");
  try {
    const userEmail = req.params.email; // Corrected variable name to userEmail
    // Validate email format
    if (!isValidEmail(userEmail)) {
      console.log("Invalid email:", userEmail);
      return res.status(400).json("Invalid email");
    }

    console.log("Searching for user with email:", userEmail);
    const author = await Author.findOne({ email: userEmail });

    if (author) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(author);
    } else {
      console.log("User not found for email:", userEmail);
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error fetching author:", error); // Corrected error message
    res.status(500).json({ error: "Internal Server Error" }); // Send appropriate error response
  }
};

const creatAuthor = async (req, res) => {
  // #swagger.tags=['users']
  const { email } = req.body; // Changed to accept only email
  try {
    const author = await new Author({
      email,
      createdAt: Date.now(),
    });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    console.error("Error creating author:", error); // Corrected error message
    res.status(500).json("Internal Server Error");
  }
};

// Function to validate email format
function isValidEmail(email) {
  // Regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const updateAuthor = async (req, res) => {
  // #swagger.tags=['authors']
  console.log("Update author route working");
  try {
    const authorId = req.params.id; // Corrected variable name to authorId
    // Validate authorId format
    if (!ObjectId.isValid(authorId)) {
      console.log("Invalid author ID:", authorId);
      return res.status(400).json("Invalid author ID");
    }

    console.log("Searching for author with ID:", authorId);
    const author = await Author.findById(authorId);

    if (!author) {
      console.log("Author not found for ID:", authorId);
      return res.status(404).json("Author not found");
    }

    // Update author fields
    const { email } = req.body;
    if (email) {
      // Validate email format
      if (!isValidEmail(email)) {
        console.log("Invalid email:", email);
        return res.status(400).json("Invalid email");
      }
      // Check if new email is unique
      const existingAuthor = await Author.findOne({ email });
      if (existingAuthor && existingAuthor._id.toString() !== authorId) {
        console.log("Email already exists:", email);
        return res.status(400).json("Email already exists");
      }
      author.email = email;
    }
    
    // Save updated author
    await author.save();

    res.status(200).json(author);
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAuthor = async (req, res) => {
  // #swagger.tags=['authors']
  console.log("Delete author route working");
  try {
    const authorId = req.params.id; // Corrected variable name to authorId
    // Validate authorId format
    if (!ObjectId.isValid(authorId)) {
      console.log("Invalid author ID:", authorId);
      return res.status(400).json("Invalid author ID");
    }

    console.log("Searching for author with ID:", authorId);
    const author = await Author.findById(authorId);

    if (!author) {
      console.log("Author not found for ID:", authorId);
      return res.status(404).json("Author not found");
    }

    // Delete author
    await author.delete();

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  creatAuthor,
  updateAuthor,
  deleteAuthor
};
