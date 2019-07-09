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

async function createSubscription(req, res) {
  console.log(req.body);

  const meal = req.body.order.plan.planDB;
  const user = req.body.user.id;

  try {
    const searchUser = await User.findById(user);
    const searchMeal = await Meal.findById(meal);
    if (!searchUser) {
      res.status(401).json("Login as user needed");
    } else {
      const totalPrice = req.body.order.price;
      const quantity = req.body.order.quantity;
      const isSubscription = req.body.isSubscription;
      const frequency = req.body.frequency;
      const subscriptionID = req.body.subscriptionID;

      const newOrder = new Order({
        meal,
        user,
        quantity,
        totalPrice,
        frequency,
        isSubscription,
        subscriptionID
      });
      // mettre à jour les stocks
      // searchMeal.quantity = searchMeal.quantity - quantity;
      // await searchMeal.save();

      await newOrder.save();
      // Sauvegarder l'order dans l'user (après le save de NewOrder pour récupérer l'ID)
      searchUser.orders.push(newOrder._id);
      await searchUser.save();

      res.status(200).json({ message: "order completed", newOrder });
    }
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
}

// async function updateSubscription(req, res) {
//   const subscriptionId = req.body.id;

//   try {
//     if (subscriptionId) {
//       const searchSubscription = await updateSubscriptionDB(subscriptionId);
//       res.json(searchSubscription);
//     }
//   } catch (err) {
//     res.status(400).json({ err: err.message });
//   }
// }

async function updateSubscriptionDB(subscriptionId) {
  try {
    const searchSubscription = await Order.findById(subscriptionId);
    searchSubscription.isActive = !searchSubscription.isActive;
    searchSubscription.save();
    return searchSubscription;
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function createSingleOrder(user, order) {
  const meals = order;
  const userId = user.id;

  try {
    const searchUser = await User.findById(userId);
    console.log("searchuser :", searchUser);

    const mealsDb = [];
    let totalPrice = 0;
    let quantity = 0;
    for (i = 0; i < meals.length; i++) {
      mealsDb.push(meals[i]._id);
      totalPrice = totalPrice + meals[i].quantity * meals[i].PricePerBag;
      quantity = quantity + meals[i].quantity;
    }
    const newOrder = new Order({
      meal: mealsDb,
      userId,
      quantity,
      totalPrice,
      isSubscription: false
    });

    await newOrder.save();
    searchUser.orders.push(newOrder._id);
    await searchUser.save();
    return newOrder;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports.createSingleOrder = createSingleOrder;
module.exports.getOrders = getOrders;
module.exports.getOrder = getOrder;
module.exports.getSubscriptions = getSubscriptions;
module.exports.createSubscription = createSubscription;
// module.exports.updateSubscription = updateSubscription;
module.exports.updateSubscriptionDB = updateSubscriptionDB;
module.exports.getUniqueOrders = getUniqueOrders;
module.exports.getSpecies = getSpecies;
module.exports.searchOrders = searchOrders;
