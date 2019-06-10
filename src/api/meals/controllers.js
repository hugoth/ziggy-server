const MealDog = require("./models/modeldog");
const MealCat = require("./models/modelcat");

async function createMealDog(req, res) {
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

    const newMeal = new MealDog({
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

async function createMealCat(req, res) {
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

    const newMeal = new MealCat({
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

async function getMealsDog(req, res) {
  try {
    const meals = await MealDog.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getMealsCat(req, res) {
  try {
    const meals = await MealCat.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

module.exports.createMealDog = createMealDog;
module.exports.createMealCat = createMealCat;
module.exports.getMealsDog = getMealsDog;
module.exports.getMealsCat = getMealsCat;
module.exports.removeMeal = removeMeal;
module.exports.updateMeal = updateMeal;
module.exports.deleteMeal = deleteMeal;
