const express = require("express");
const URL = require("../models/url");
const User = require("../models/user");

const route = express.Router();

route.get("/", async (req, res) => {
  if (!req.user) return res.redirect('/login')
  const urls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: urls,
  });
});

route.get("/signup", async (req, res) => {
  return res.render("signup");
});

route.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = route;
