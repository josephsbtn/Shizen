const mongoose = require("mongoose");
const { DB_URI } = require("./config.js");
const dbconnect = async () => {
  try {
    mongoose.connect(DB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = {
  dbconnect,
};
