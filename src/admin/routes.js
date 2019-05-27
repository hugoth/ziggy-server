const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/admin/signup", controller.signUp);

router.post("/admin/login", controller.logIn);

router.get("/", controller.getAdmin);

module.exports = router;
