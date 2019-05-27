const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.get("/users", controller.getUsers);
router.post("/user/signup", controller.signUp);
router.get("/user/login", controller.logIn);

module.exports = router;
