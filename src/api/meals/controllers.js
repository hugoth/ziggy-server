const Meal = require("./model");
const fakemeals = require("../db/db.json");

async function createMeal(req, res) {
  try {
    const {
      title,
      species,
      quantity,
      weight,
      caloriesPerBag,
      ingredients,
      description,
      pricePerBag
    } = req.body.meal;

    const newMeal = new Meal({
      title,
      species,
      quantity,
      weight,
      caloriesPerBag,
      ingredients,
      description,
      pricePerBag
    });

    await newMeal.save();
    res.status(200).json({ message: "Meal created", newMeal });
  } catch (error) {
    res.status(402).json({ error: error.message });
    console.log(error);
  }
}

async function getMeals(req, res) {
  // try {
  //   const meals = await Meal.find();
  //   res.status(200).json(meals);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
  res.json(fakemeals);
}

async function removeMeal(req, res) {
  try {
    const meal = await Meal.findById(req.body.id);
    if (meal !== null) {
      if (meal.quantity >= req.body.quantity) {
        meal.quantity = meal.quantity - req.body.quantity;
        await meal.save();
        res.json({ message: "Quantity modified" });
      } else {
        res.status(401).json("out of stock");
      }
    } else {
      res.json("Meal not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateMeal(req, res) {
  try {
    const meal = await Meal.findById(req.body.id);
    if (meal !== null) {
      meal.quantity = meal.quantity + req.body.quantity;
      await meal.save();
      res.status(200).json(meal);
    } else {
      res.json({ error: { message: "Bad request" } });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteMeal(req, res) {
  try {
    const meal = await Meal.findById(req.body.id);
    if (meal !== null) {
      await meal.remove();

      res.status(200).json("Meal deleted");
    } else {
      res.json({ error: { message: "Bad request" } });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.createMeal = createMeal;
module.exports.getMeals = getMeals;
module.exports.removeMeal = removeMeal;
module.exports.updateMeal = updateMeal;
module.exports.deleteMeal = deleteMeal;
