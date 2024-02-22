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
  const user = new User({
    email: req.body.email,
    fullName: req.body.fullName,
    birthDate: req.body.birthDate,
    address: req.body.address,
    biography: req.body.biography,
    isAuthor: req.body.isAuthor,
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).json("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Enter a valid user Id");
  }
  const userId = new ObjectId(req.params.id);

  const user = {
    email: req.body.email,
    fullName: req.body.fullName,
    birthDate: req.body.birthDate,
    address: req.body.address,
    biography: req.body.biography,
  };

  const response = await User.findByIdAndUpdate({ _id: userId }, user, {
    new: true,
  });

  if (response) {
    return res.status(200).send(response);
  } else {
    res.status(404).json({ error: "User not found for update or no changes made." });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const response = await User.findByIdAndDelete({ _id: userId });

  if (response) {
    return res.status(204).send();
  } else {
    res.status(404).json("User not found for deletion");
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
