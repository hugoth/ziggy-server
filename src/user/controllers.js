const Users = require("../db/Ziggy-DB.json");
const mongoose = require("mongoose");

const User = mongoose.model("User");

async function getUsers(req, res) {
  try {
    res.json(Users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    //   const user = Users.findById(id);
    // require Mongoose, not possible whith local DB

    res.json(Users[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
