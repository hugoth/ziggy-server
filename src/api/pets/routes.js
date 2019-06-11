const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/pet/calculdailyneeds", controller.calculDailyNeeds);
router.get("/pets:species", controller.getSpecies);
router.get("/pets", controller.getPets);
router.post("/pets/update", controller.updatePets);

module.exports = router;
