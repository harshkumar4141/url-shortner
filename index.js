const express = require("express");
const { connectToDB } = require("./connection");
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth')

const app = express();
const PORT = 8001;

const mongoose = require("mongoose");
const User = require("./models/user")
const Url = require("./models/url");
const path = require("path");

const urlRoutes = require("./routes/url");
const userRoutes = require('./routes/user')
const staticRoute = require("./routes/staticRoute");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

connectToDB("mongodb://localhost:27017/url-shortener")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

app.use("/url",restrictToLoggedInUserOnly, urlRoutes);
app.use("/", staticRoute);
app.use('/user',checkAuth, userRoutes)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
