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

const admin = require("./Routes/admin_routes");
app.use(admin);

const user = require("./Routes/user_routes");
app.use(user);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
