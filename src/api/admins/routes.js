const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.get("/", controller.getAdmin);

router.post("/signup", controller.signUp);

router.post("/admins/login", controller.logIn);

module.exports = router;
