const Order = require("./model");

async function getOrders(req, res) {
  try {
    const orders = Order.find().populate("User");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createOrder(req, res) {
  const user = req.body.id;
  try {
    const searchUser = User.findById(req.body.id);
    if (!searchUser) {
      res.status(401).json("Login as user needed");
    } else {
      const { type, species, quantity, price, description, date } = req.body;
      const newOrder = new Order({
        type,
        species,
        quantity,
        price,
        description,
        date,
        user
      });

      res.status(200).json({ newOrder });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.getOrders = getOrders;
module.exports.createOrder = createOrder;
