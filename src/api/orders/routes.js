const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.get("/orders", controller.getOrders);
router.get("/order/:id", controller.getOrder);
router.get("/orders/subscriptions", controller.getSubscriptions);
router.post("/order/create/subscription", controller.createSubscription);
router.post("/order/create/order", controller.createSingleOrder);
router.get("/orders/uniqueorders", controller.getUniqueOrders);
router.get("/orders/:pets", controller.getSpecies);
router.get("/orders/search/:name", controller.searchOrders);

module.exports = router;
