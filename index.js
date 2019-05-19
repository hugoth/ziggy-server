const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/ziggy-server", { useNewUrlParser: true });

const admin = require("./Routes/admin_routes");
app.use(admin);

app.listen(3000, () => {
  console.log("Server started");
});
