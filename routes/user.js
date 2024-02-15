const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user");
const validation = require("../middleware/validate");

const { isAuthenticated } = require("../middleware/authenticate");

router
  .get("/", usersController.getAllUsers)
  .get("/:id", usersController.getSingleUser)
  .post("/", validation.storeUser, isAuthenticated, usersController.createUser)
  .put(
    "/:id",
    validation.storeUser,
    isAuthenticated,
    usersController.updateUser
  )
  .delete("/:id", isAuthenticated, usersController.deleteUser);

module.exports = router;
