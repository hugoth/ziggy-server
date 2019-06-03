const mongoose = require("mongoose");
const orderSchema = require("./Schema");

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
