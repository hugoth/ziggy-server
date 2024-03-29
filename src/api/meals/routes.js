const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/meals/create", controller.createMeal);
router.get("/meals", controller.getMeals);
router.post("/meals/remove", controller.removeMeal);
router.post("/meals/update", controller.updateMeal);
router.post("/meals/delete", controller.deleteMeal);
// router.post("/meals/update", controller.update);

module.exports = router;
