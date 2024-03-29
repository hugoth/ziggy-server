const mongoose = require("mongoose");

const Admin = mongoose.model("Admin", {
  name: {
    type: String,
    default: ""
  },
  mail: {
    type: String
  },
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

module.exports = Admin;
