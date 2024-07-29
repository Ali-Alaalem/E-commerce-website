const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  categorys: {
    type: String,
    required: true,
  },
});

const Items = mongoose.model("Items", itemSchema);

module.exports = Items;
