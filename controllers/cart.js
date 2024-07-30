const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/:userId/cart", async (req, res) => {
  const categorys = req.body.type;

  try {
    const current = await User.findById(req.session.user.id);
    let found = false;
    current.cart.forEach((item) => {
      if (item.name === req.body.name) {
        let final = item.qty + parseInt(req.body.qty);
        item.qty = final;
        found = true;
      }
    });
    if (!found) {
      current.cart.push(req.body);
    }

    await current.save();
    res.redirect(`/Categorys/${categorys}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
