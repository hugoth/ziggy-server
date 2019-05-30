const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUser);
router.post("/users/signup", controller.signUp);
router.post("/users/login", controller.logIn);

module.exports = router;
