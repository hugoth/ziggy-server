const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstName: { type: String, index: true },
  lastName: { type: String, index: true },
  mail: String,
  hash: String,
  salt: String,
  token: String,
  gender: String,
  picture: String,
  mail: String,
  phone: String,
  deliveryAddress: Object,
  billingAddress: Object,
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
});

User.createIndexes({
  firstName: "text",
  lastName: "text"
});

module.exports = User;
