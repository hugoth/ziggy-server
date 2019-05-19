const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const Admin = require("../Models/admin");

router.post("/admin/create", async (req, res) => {
  const password = req.body.password;
  const token = uid2(16);
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  try {
    const newAdmin = new Admin({
      name: req.body.name,
      mail: req.body.mail,
      token: token,
      salt: salt,
      hash: hash
    });
    await newAdmin.save();
    res.json({ message: "Admin created", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Admin.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/admin/login", async (req, res) => {
  const user = await Admin.findOne({ mail: req.body.mail });
  const password = req.body.password;
  if (!user) {
    res.json({ message: "user whith this mail not found" });
  }
  try {
    if (SHA256(password + user.salt).toString(encBase64) === user.hash) {
      const token = user.token;
      res.json({ message: "Vous êtes bien login", token });
    } else {
      res.json({ message: "password incorrect" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
