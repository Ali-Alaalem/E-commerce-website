const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  type: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
