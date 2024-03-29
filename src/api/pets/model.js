const mongoose = require("mongoose");

const Pet = mongoose.model("Pet", {
  name: {
    type: String,
    default: ""
  },
  species: String,
  breedfactor: Number,
  breed: String,
  age: Number,
  weight: Number,
  sterilized: Boolean,
  gender: String,
  physiology: String,
  fitness: String,
  healthcare: String,
  foodsupply: String,
  allergic: String,
  appetite: String,
  eatcandies: String,
  owner: Object,
  dailyNeeds: Number
});

module.exports = Pet;
