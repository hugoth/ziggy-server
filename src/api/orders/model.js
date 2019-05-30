const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  type: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: {
    type: Number,
    required: true
  },
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = Order;
