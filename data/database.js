// data/database.js
const mongoose = require("mongoose");
require("dotenv").config();
const dbName = 'Task';

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("connect to the database")).catch((err) => {
    console.log(err.message);
  });