const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true },

  isSubscription: {
    type: Boolean,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  },
  frequency: Number,

  quantity: {
    type: Number,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalPrice: {
    type: Number,
    required: true
  },
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = Order;
