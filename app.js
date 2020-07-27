const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const User = require("./user");

mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost:27017/mongo-3', { useNewUrlParser: true });

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get("/", async (req, res) => {
  const users = await User.find();
  res.render("index", { users: users });
});

app.get("/register", (req, res) => {
  res.render("new");
});

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const user = await User.create(data);
  } catch (e) {
    console.error(e);
  }
  res.redirect("/");
});

app.listen(3000, () => console.log("Listening on port 3000 ..."));