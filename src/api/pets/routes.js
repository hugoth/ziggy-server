const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/pet/calculdailyneeds", controller.calculDailyNeeds);
router.get("/pets:species", controller.getPets);

module.exports = router;
