const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.get("/users", controller.getUsers);

router.get("/users/:id", controller.getUser);

module.exports = router;
