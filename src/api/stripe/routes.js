const express = require("express");
const router = express.Router();
const controller = require("./controllers");

// router.post("/payment", controller.payment);
router.post("/createcard", controller.createCard);
router.post("/createproduct", controller.createProduct);
router.post("/createstock", controller.createStock);
router.post("/createsubscription", controller.CreateSubscription);
router.post("/createorder", controller.createOrder);
router.post("/createcustomer", controller.createCustomer);

module.exports = router;
