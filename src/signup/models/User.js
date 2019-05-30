const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  password: String,
  token: String,
  hash: String,
  salt: String,

  account: {
    username: { type: String, unique: true, required: true },
    phone: { type: String }
  }
});

module.exports = mongoose.model("User", User, "users");
