const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/pet/calculdailyneeds", controller.calculDailyNeeds);

module.exports = router;
