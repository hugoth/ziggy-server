const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.get("/orders", controller.getOrders);
router.post("/order/create", controller.createOrder);

module.exports = router;
