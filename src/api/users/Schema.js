const mongoose = require("mongoose");

let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

const userSchema = new mongoose.Schema({
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
  date: {
    type: String,
    default: today
  },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
});

userSchema.index({
  firstName: "text",
  lastName: "text"
});

module.exports = userSchema;
