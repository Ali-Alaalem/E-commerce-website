const express = require("express");
const User = require("../models/user");
const Items = require("../models/items");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

router.get("/sign-up", (req, res, next) => {
  res.render("auth/sign-up.ejs");
});
router.post("/sign-up", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confPassword = req.body.confirmPassword;
  try {
    const thereIsuser = await User.findOne({ email });

    if (thereIsuser) {
      return res.send("Ooops somtging went wrong");
    }
    if (password !== confPassword) {
      return res.send("Password and confirm password do not match");
    }

    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.redirect("/auth/sign-in");
  } catch (error) {
    throw new Error("somthing went wrong");
  }
});

router.get("/sign-in", (req, res, next) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const thereIsuser = await User.findOne({ email });

    if (!thereIsuser) {
      return res.send("Invalid username or password");
    }

    const validPassword = bcrypt.compareSync(password, thereIsuser.password);
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }

    req.session.user = {
      type: thereIsuser.type,
      id: thereIsuser._id,
    };
    res.redirect("/store/home");
  } catch (error) {
    next(error);
  }
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.post("/store", async (req, res) => {
  await Items.create(req.body);

  res.redirect("/store/home");
});

module.exports = router;
