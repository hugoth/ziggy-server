const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstName: {
    type: String,
    default: ""
  },
  lastName : String,
  mail: String,
  hash: String,
  salt: String,
  token: String,
  age: Number,
  gender: String,
  picture: String,
  email: String,
  phone: String,
  deliveryAddress: String,
  billingAddress = String,
  pets: Array,
  subscription : Array,
  orders : Array
});

module.exports = User;
