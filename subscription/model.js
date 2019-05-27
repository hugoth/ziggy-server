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
      price: EUD
    }
  }
});
module.exports = Subscription;
