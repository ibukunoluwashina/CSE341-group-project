const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user");

router
  .get("/", usersController.getAll)
  .get("/:id", usersController.getSingle)
  .post("/", usersController.createUser)
  .put("/:id", usersController.updateUser)
  .delete("/:id", usersController.deleteUser);

module.exports = router;
