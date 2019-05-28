const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const Users = require("../db/Ziggy-DB.json");
const User = require("./model");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function logIn(req, res) {
  const searchUser = await User.findOne({ mail: req.body.mail });

  if (!searchUser) {
    res.json({ message: "user with this mail not found" });
  }

  const user = {
    name: searchUser.name,
    mail: searchUser.mail,
    token: searchUser.token,
    pets: searchUser.pets
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
      // il faut créer un modèle de order / commande et l'appeler ici avec un New Order en intégrant une ref à l'user

      // ==>
      // const subscription = user.subscription;
      // const orders = user.orders;
      // ==>

      // infos sur l'animal(aux) de l'user

      const pets = user.pets;

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
        pets
        // subscription,
        // orders,
      });

      await newUser.save();
      console.log(newUser);

      res.status(200).json({ message: "User sign up !", token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports.getUsers = getUsers;
module.exports.logIn = logIn;
module.exports.signUp = signUp;
