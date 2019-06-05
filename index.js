const express = require("express");
const { setUpMiddlewares } = require("./src/services/middlewares");
const { connect } = require("./src/services/database");

const app = express();
connect();
setUpMiddlewares(app);

// - This is your main route /api => call all others routes
app.use("/api", require("./src/api"));

require("./src/api/pets/model");
require("./src/api/users/model");
require("./src/api/admins/model");
require("./src/api/meals/model");
require("./src/api/orders/model");
require("./src/api/stripe/routes");

const admins = require("./src/api/admins/routes");
app.use(admins);

const users = require("./src/api/users/routes");
app.use(users);

const pets = require("./src/api/pets/routes");
app.use(pets);

const meals = require("./src/api/meals/routes");
app.use(meals);

const orders = require("./src/api/orders/routes");
app.use(orders);

const stripe = require("./src/api/stripe/routes");
app.use(stripe);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
