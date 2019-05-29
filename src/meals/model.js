const mongoose = require("mongoose");

const Meal = mongoose.model("Meal", {
  title: String,
  species: String,
  files: Array,
  quantity: Number,
  weight: Number,
  calories: Number,
  ingredients: String,
  description: String,
  price: Number
});

module.exports = Meal;