const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

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

async function logIn(req, res) {
  try {
    const id = req.params.id;
    //   const user = Users.findById(id);
    // require Mongoose, not possible whith local DB
    res.json(Users[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function signUp(req, res) {
  const { user } = req.body;
  const mail = user.mail;
  const existingUser = await User.findOne({ mail: mail });
  if (existingUser) {
    res.json({ message: "User with this mail already registered" });
  } else {
    try {
      // infos authentification sur l'user
      const mail = user.mail;
      const password = req.body.password;
      const token = uid2(16);
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);

      // infos perso sur l'user
      const firstName = user.firstName;
      const lastName = user.lastName;
      const phone = user.phone;
      const age = user.age;

      // infos de facturation sur l'user

      const deliveryAddress = user.deliveryAddress;
      const billingAddress = user.billingAddress;

      // infos sur l'abonnement de l'user

      const subscription = user.subscription;
      const orders = user.orders;

      // infos sur l'animal(aux) de l'user

      const pets = user.pet;

      const newUser = new User({
        mail,
        token,
        salt,
        hash,
        firstName,
        lastName,
        phone,
        age,
        deliveryAddress,
        billingAddress,
        subscription,
        orders,
        pets
      });

      await newUser.save();
      res.status(200).json({ message: "User signUp", token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports.getUsers = getUsers;
module.exports.logIn = logIn;
module.exports.signUp = signUp;
