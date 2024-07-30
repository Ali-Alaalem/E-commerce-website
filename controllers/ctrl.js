const express = require("express");
const User = require("../models/user");
const Items = require("../models/items");

const landing = async (req, res, next) => {
  res.render("index.ejs");
};

const home = async (req, res) => {
  const current = req.session.user.id;
  const thereIsuser = await User.findById(current);

  if (thereIsuser.type === true) {
    return res.render("store/admin.ejs");
  }
  res.render("store/home.ejs");
};

const edit = async (req, res) => {
  const current = await User.findById(req.session.user.id);
  res.render("store/edit.ejs", { user: current });
};

const profile = async (req, res) => {
  const current = await User.findById(req.session.user.id);

  res.render("store/profile.ejs", { user: current });
};

const cart = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    const cart = user.cart;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    res.render("store/cart.ejs", { user, totalPrice });
  } catch (error) {
    res.status(500).send("Failed to retrieve items");
  }
};

const food = async (req, res) => {
  try {
    const user = req.session.user.id;

    const items = await Items.find({ categorys: "Food" });
    res.render("Categorys/Food.ejs", { items, user });
  } catch (error) {
    res.status(500).send("Failed to retrieve items");
  }
};

const drink = async (req, res) => {
  try {
    const user = req.session.user.id;
    const items = await Items.find({ categorys: "Drinks" });
    res.render("Categorys/Drinks.ejs", { items, user });
  } catch (error) {
    res.status(500).send("Failed to retrieve items");
  }
};
const groceries = async (req, res) => {
  try {
    const user = req.session.user.id;

    const items = await Items.find({ categorys: "Groceries" });
    res.render("Categorys/Groceries.ejs", { items, user });
  } catch (error) {
    res.status(500).send("Failed to retrieve items");
  }
};

module.exports = { landing, home, cart, food, drink, groceries, profile, edit };
