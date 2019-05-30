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
  idealweight: Number,
  fitness: String,
  hungerlever: String,
  healthcare: Boolean,
  foodsupply: String,
  allergic: Boolean,
  allergicto: String,
  specialdiet: Boolean
});

module.exports = Pet;
