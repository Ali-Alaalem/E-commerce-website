const express = require("express");

const landing = async (req, res, next) => {
  res.render("index.ejs");
};

const home = async (req, res) => {
  res.render("store/home.ejs");
};
const cart = async (req, res) => {
  res.render("store/cart.ejs");
};

module.exports = { landing, home, cart };
