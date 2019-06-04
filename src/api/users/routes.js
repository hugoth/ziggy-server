const express = require("express");
const router = express.Router();

const controller = require("./controllers");

router.get("/users", controller.getUsers);
router.get("/user/:id", controller.getUser);
router.post("/users/signup", controller.signUp);
router.post("/users/login", controller.logIn);
router.get("/users/search/:name", controller.searchUser);
router.post("/user/update", controller.updateUser);

module.exports = router;
