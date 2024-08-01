const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.delete("/users/:userId/cart/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);

    await user.save();

    res.redirect("/store/cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting item");
  }
});

router.put("/users/:userId/cart/:itemId", async (req, res) => {
  try {
    const current = await User.findById(req.params.userId);
    const cartId = req.params.itemId;
    const newQty = parseInt(req.body.qty);
    if (req.body.qty >= 1) {
      const item = current.cart.id(cartId);
      if (item) {
        item.qty = newQty;
      }
      await current.save();
      res.redirect(`/store/cart`);
    } else {
      res.redirect(`/store/cart`);
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/users/:userId/cart", async (req, res) => {
  const itemId = req.params.itemId;
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();

    res.redirect("/store/cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting item");
  }
});

module.exports = router;
