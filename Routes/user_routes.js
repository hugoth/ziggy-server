const express = require("express");
const router = express.Router();

const Users = require("../db/Ziggy-DB.json");

router.get("/users", async (req, res) => {
  try {
    res.json(Users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
