// data/database.js
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to Database")).catch((err) => {
    console.log(err.message);
  });