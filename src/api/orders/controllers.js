const Order = require("./model");
const User = require("../users/model");
const Meal = require("../meals/model");

let today = new Date();
const mm = String(today.getDate()).padStart(2, "0");
const dd = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

async function getOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("meal")
      .populate("user");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function searchOrders(req, res) {
  const name = req.params.name;
  try {
    const orders = await Order.find()
      .populate("user")
      .populate({
        path: "meal",
        match: { title: { $eq: name } }
      });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate("meal")
      .populate("user");
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSubscriptions(req, res) {
  try {
    const orders = await Order.find({ isSubscription: true })
      .populate("meal")
      .populate("user");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUniqueOrders(req, res) {
  try {
    const orders = await Order.find({ isSubscription: false })
      .populate("meal")
      .populate("user");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSpecies(req, res) {
  const pet = req.params.pets;
  try {
    const orders = await Order.find()
      .populate("meal")
      .populate("user");
    ordersPets = orders.filter(order => {
      return order.meal.species === pet;
    });

    res.json(ordersPets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createOrder(req, res) {
  console.log(req.body.user);

  try {
    const searchUser = await User.findById(req.body.user);
    const searchMeal = await Meal.findById(req.body.meal);
    if (!searchUser) {
      res.status(401).json("Login as user needed");
    } else {
      const { quantity, frequency, isSubscription, meal, user } = req.body;

      const totalPrice = searchMeal.pricePerBag * quantity;

      const newOrder = new Order({
        meal,
        user,
        quantity,
        totalPrice,
        frequency,
        isSubscription
      });
      // mettre à jour les stocks
      searchMeal.quantity = searchMeal.quantity - quantity;
      await searchMeal.save();

      await newOrder.save();
      // Sauvegarder l'order dans l'user (après le save de NewOrder pour récupérer l'ID)
      searchUser.orders.push(newOrder._id);
      await searchUser.save();

      res.status(200).json({ message: "order completed", newOrder });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.getOrders = getOrders;
module.exports.getOrder = getOrder;
module.exports.getSubscriptions = getSubscriptions;
module.exports.createOrder = createOrder;
module.exports.getUniqueOrders = getUniqueOrders;
module.exports.getSpecies = getSpecies;
module.exports.searchOrders = searchOrders;
