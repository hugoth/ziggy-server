const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  meal: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true }],

  isSubscription: {
    type: Boolean,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  },
  frequency: Number,

  // quantity: {
  //   type: Number,
  //   required: true
  // },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalPrice: {
    type: Number,
    required: true
  },
  subscriptionID: {
    type: String
  },

  date: { type: Date, default: Date.now() }
});

orderSchema.index({
  meal: "text",
  user: "text"
});

module.exports = orderSchema;
