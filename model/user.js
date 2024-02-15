const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  address: { type: String, required: true },
  biography: { type: String, required: true },
  isAuthor: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
