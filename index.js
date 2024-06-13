const express = require("express");
const Path = require("path");
const userModels = require("./models/User");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModels.find();
  res.render("read", { users });
});

app.get("/edit/:userid", async (req, res) => {
  let users = await userModels.findOne({ _id: req.params.userid });
  res.render("edit", { users });
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModels.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, imageURL } = req.body;
  let createUser = await userModels.create({
    name,
    email,
    imageURL,
  });
  res.redirect("/read");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
