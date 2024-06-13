const { name } = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/usersDB");

const userShema = new mongoose.Schema({
  imageURL: String,
  email: String,
  name: String,
});

module.exports = mongoose.model("User", userShema);
