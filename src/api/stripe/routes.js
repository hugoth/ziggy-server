const express = require("express");
const router = express.Router();
const controller = require("./controllers");

// router.post("/createproduct", controller.createProduct);
// router.post("/createstock", controller.createStock);
router.post("/stripe/create/subscription", controller.createSubscription);
router.post("/stripe/create/order", controller.createOrder);

module.exports = router;
