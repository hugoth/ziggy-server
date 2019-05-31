const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.get("/orders", controller.getOrders);
router.get("/order/:id", controller.getOrder);
router.get("/orders/subscriptions", controller.getSubscriptions);
router.post("/order/create", controller.createOrder);
router.get("/orders/uniqueorders", controller.getUniqueOrders);
router.get("/orders/:pets", controller.getSpecies);

module.exports = router;
