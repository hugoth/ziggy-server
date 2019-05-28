const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const Admin = require("./model");

async function signUp(req, res) {
  try {
    const password = req.body.password;
    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    const newAdmin = new Admin({
      name: req.body.name,
      mail: req.body.mail,
      token,
      salt,
      hash
    });
    await newAdmin.save();

    res.json({ message: "Admin created", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function logIn(req, res) {
  const searchUser = await Admin.findOne({ mail: req.body.mail });

  if (!searchUser) {
    res.json({ message: "user with this mail not found" });
  }

  const user = {
    name: searchUser.name,
    mail: searchUser.mail,
    token: searchUser.token
  };
  const password = req.body.password;

  try {
    if (
      SHA256(password + searchUser.salt).toString(encBase64) === searchUser.hash
    ) {
      res.json({ message: "Vous êtes bien login", user });
    } else {
      res.json({ message: "password incorrect" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAdmin(req, res) {
  try {
    const users = await Admin.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.signUp = signUp;
module.exports.logIn = logIn;
module.exports.getAdmin = getAdmin;
