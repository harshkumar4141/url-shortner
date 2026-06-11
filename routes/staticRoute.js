const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const route = express.Router();

route.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: urls,
  });
});

route.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/signup");
  }

  const urls = await URL.find({ createdBy: req.user._id });

  return res.render("home", {
    urls,
  });
});

route.get("/signup", async (req, res) => {
  return res.render("signup");
});

route.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = route;
