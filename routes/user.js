const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const route = express.Router();

route.post("/", handleUserSignup).post("/login", handleUserLogin);

module.exports = route;
