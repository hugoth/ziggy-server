const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstName: {
    type: String,
    default: ""
  },
  lastName: String,
  mail: String,
  hash: String,
  salt: String,
  token: String,
  gender: String,
  picture: String,
  mail: String,
  phone: String,
  deliveryAddress: String,
  billingAddress: String,
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  owner: String
});

module.exports = User;
