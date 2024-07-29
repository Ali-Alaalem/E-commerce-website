const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const port = process.env.PORT ? process.env.PORT : "3000";

require("./config/database");
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const Ctrl = require("./controllers/ctrl");
const storeController = require("./controllers/store.js");
const authController = require("./controllers/auth.js");
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
app.get("/store/home", Ctrl.home);
app.get("/store/cart", Ctrl.cart);
app.get("/Categorys/Food", Ctrl.food);
app.get("/store/profile", Ctrl.profile);
app.get("/store/edit", Ctrl.edit);
app.get("/Categorys/Drinks", Ctrl.drink);
app.get("/Categorys/Groceries", Ctrl.groceries);
app.use("/users", storeController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
