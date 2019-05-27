const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    type: String,
    default: ""
  },
  mail: {
    type: String
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  },
  picture: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  address: String,
  hash: {
    type: String
  },
  salt: {
    type: String
  },
  token: {
    type: String
  }
});

module.exports = User;
