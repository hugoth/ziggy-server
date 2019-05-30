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
  purebred: Boolean,
  gender: String,
  physiology: String,
  fitness: String,
  healthcare: Boolean,
  foodsupply: String,
  allergic: String,
  appetite: String,
  eatCandies: String,
  owner: Object
});

module.exports = Pet;
