const mongoose = require("mongoose");

const MealCat = mongoose.model("MealCat", {
  title: String,
  species: String,
  quantity: Number,
  weight: Number,
  caloriesPerBag: Number,
  ingredients: String,
  description: String,
  pricePerBag: Number
});

module.exports = MealCat;
