const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/subscription", controller.Subscription);

module.exports = router;
