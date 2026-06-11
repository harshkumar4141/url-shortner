require("dotenv").config();

const express = require("express");
const { connectToDB } = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const path = require("path");

const app = express();
const PORT = process.env.PORT ;

const urlRoutes = require("./routes/url");
const userRoutes = require("./routes/user");
const staticRoute = require("./routes/staticRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

connectToDB(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
app.use("/", staticRoute);
app.use("/user", userRoutes);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
