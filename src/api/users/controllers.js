const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("./model");

async function getUsers(req, res) {
  try {
    const users = await User.find()
      .populate("pets")
      .populate({
        path: "orders",
        populate: {
          path: "meal"
        }
      });

    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findOne({ id: req.query.id })
      .populate("pets")
      .populate({
        path: "orders",
        populate: {
          path: "meal"
        }
      });

    res.json(user);
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
  const mail = req.body.user.mail;
  const existingUser = await User.findOne({ mail: mail });
  if (existingUser) {
    res.json({ message: "User with this mail already registered" });
  } else {
    try {
      const {
        password,
        firstName,
        lastName,
        phone,
        deliveryAddress,
        billingAddress,
        pets
        // subscription,
        // orders,
      } = req.body.user;

      const token = uid2(16);
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);

      const newUser = new User({
        mail,
        token,
        salt,
        hash,
        firstName,
        lastName,
        phone,
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
module.exports.getUser = getUser;
module.exports.logIn = logIn;
module.exports.signUp = signUp;
