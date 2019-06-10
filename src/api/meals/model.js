const mongoose = require("mongoose");

const Meal = mongoose.model("Meal", {
  title: String,
  species: String,
  quantity: Number,
  weight: Number,
  caloriesPerBag: Number,
  ingredients: String,
  description: String,
  pricePerBag: Number
});

module.exports = Meal;
