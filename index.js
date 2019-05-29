const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/ziggy-server",
  { useNewUrlParser: true }
);

require("./src/pet/model");
require("./src/user/model");
require("./src/admin/model");
require("./src/meals/model");

const admins = require("./src/admin/routes");
app.use(admins);

const users = require("./src/user/routes");
app.use(users);

const pets = require("./src/pet/routes");
app.use(pets);

const meals = require("./src/meals/routes");
app.use(meals);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
