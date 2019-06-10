const mongoose = require("mongoose");

const MealDog = mongoose.model("MealDog", {
  title: String,
  species: String,
  quantity: Number,
  weight: Number,
  caloriesPerBag: Number,
  ingredients: String,
  description: String,
  pricePerBag: Number
});

module.exports = MealDog;
