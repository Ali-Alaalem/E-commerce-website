const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const port = process.env.PORT ? process.env.PORT : "3000";

//for image upload
const fs = require("fs");
const imgur = require("imgur");
const fileUpload = require("express-fileupload");
app.use(fileUpload());

require("./config/database");
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const Ctrl = require("./controllers/ctrl");
const storeController = require("./controllers/store.js");
const authController = require("./controllers/auth.js");
const cartController = require("./controllers/cart.js");
const cartDeletecontroller = require("./controllers/deleteCart.js");
cartDeletecontroller;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/store/home`);
  } else {
    res.render("index.ejs");
  }
});

app.use(passUserToView);
app.get("/", Ctrl.landing);
app.use("/auth", authController);

app.use(isSignedIn);
app.get("/store/home", isSignedIn, Ctrl.home);
app.get("/store/cart", isSignedIn, Ctrl.cart);
app.get("/Categorys/Food", isSignedIn, Ctrl.food);
app.get("/store/profile", isSignedIn, Ctrl.profile);
app.get("/store/edit", isSignedIn, Ctrl.edit);
app.get("/Categorys/Drinks", isSignedIn, Ctrl.drink);
app.get("/Categorys/Groceries", isSignedIn, Ctrl.groceries);
app.use("/users", isSignedIn, storeController);
app.use("/users", isSignedIn, cartController);
app.use("/", isSignedIn, cartDeletecontroller);
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
