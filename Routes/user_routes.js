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

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  //   const user = Users.findById(id);
  // require Mongoose, not possible whith local DB

  try {
    res.json(Users[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
