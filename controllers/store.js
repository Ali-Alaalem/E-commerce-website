const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Items = require("../models/items");

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, req.body);
    res.redirect("/store/home");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
