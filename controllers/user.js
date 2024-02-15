const ObjectId = require("mongodb").ObjectId;
const User = require("../model/user");

const getAllUsers = async (req, res) => {
  // #swagger.tags=['Users']
  try {
    const users = await User.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getSingleUser = async (req, res) => {
  // #swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const user = await User.findOne({ _id: userId });

    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json("Internal Server Error");
  }
};

const createUser = async (req, res) => {
  // #swagger.tags=['Users']
  const { email, fullName, birthDate, address, biography } = req.body;
  try {
    const user = new User({
      email,
      fullName,
      birthDate,
      address,
      biography,
    });

    await user.save();
    res.send(user);
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).json("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const user = { ...req.body };
    const response = await User.findByIdAndUpdate({ _id: userId }, user, {
      new: true,
    });

    if (response) {
      return res.status(200).send(response);
    } else {
      res.status(404).json("User not found for update or no changes made.");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const response = await User.findByIdAndDelete({ _id: userId });

    if (response) {
      return res.status(200).send();
    } else {
      res.status(404).json("User not found for deletion");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
