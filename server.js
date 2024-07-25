const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT ? process.env.PORT : "3000";
const path = require("path");
require("./config/database");
const Ctrl = require("./controllers/ctrl");
const authController = require("./controllers/auth.js");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", Ctrl.landing);
app.get("/store/home", Ctrl.home);
app.get("/store/cart", Ctrl.cart);
app.use("/auth", authController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
