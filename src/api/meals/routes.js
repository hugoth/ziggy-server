const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/meals/create/dog", controller.createMealDog);
router.post("/meals/create/cat", controller.createMealCat);
router.get("/mealsdog", controller.getMealsDog);
router.get("/mealscat", controller.getMealsCat);
router.post("/meals/remove", controller.removeMeal);
router.post("/meals/update", controller.updateMeal);
router.post("/meals/delete", controller.deleteMeal);
// router.post("/meals/update", controller.update);

module.exports = router;
