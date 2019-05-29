const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.post("/admins/signup", controller.signUp);
router.post("/admins/login", controller.logIn);
router.get("/admins", controller.getAdmin);

module.exports = router;
