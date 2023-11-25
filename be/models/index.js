const mongoose = require("mongoose");
const User = require("./users.model");

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/manav");
      console.log("Connection established successfully to the database");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error; // Throw the error to indicate connection failure
    }
  };
module.exports = {
  connectDB,
  User,
};
