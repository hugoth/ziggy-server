const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/pet/calculdailyneed", controller.calculDailyNeed);

module.exports = router;
