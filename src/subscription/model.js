const mongoose = require("mongoose");
const Subscription = mongoose.model("Subscription", {
  species: {
    name: {
      type: String,
      default: ""
    },
    subcription: {
      type: Number
    },
    active: {
      type: Boolean
    },
    recipe: {
      type: String
    },
    order: {
      type: String
    },
    billing: {
      type: Null,
      device: EUD,
      adresse: String,
      price: Number,
      phone: Number
    }
  }
});
module.exports = Subscription;
