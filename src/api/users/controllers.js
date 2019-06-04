const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("./model");

let today = new Date();
const mm = String(today.getDate()).padStart(2, "0");
const dd = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

async function searchUser(req, res) {
  const name = req.params.name;

  try {
    const users = await User.find({
      $text: {
        $search: name
      }
    })
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
    const user = await User.findById(req.params.id)
      .populate("pets")
      .populate({
        path: "orders",
        populate: {
          path: "meal"
        }
      });

    const selectedUser = {
      date: user.date,
      firstName: user.firstName,
      lastName: user.lastName,
      mail: user.mail,
      orders: user.orders,
      pets: user.pets,
      token: user.token,
      id: user._id,
      phone: user.phone,
      deliveryAddress: user.deliveryAddress
    };

    res.json(selectedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function logIn(req, res) {
  const searchUser = await User.findOne({ mail: req.body.user.mail });

  if (!searchUser) {
    res.status(400).json({ error: "User not found" });
  }

  const user = {
    firstName: searchUser.firstName,
    mail: searchUser.mail,
    token: searchUser.token,
    pets: searchUser.pets,
    id: searchUser._id
  };
  const password = req.body.user.password;

  try {
    if (
      SHA256(password + searchUser.salt).toString(encBase64) === searchUser.hash
    ) {
      res.status(200).json({ message: "Vous êtes bien login", user });
    } else {
      res.status(401).json({ message: "password incorrect" });
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
      } = req.body.user;

      const token = uid2(16);
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const date = today;

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
        pets,
        date
      });
      await newUser.save();

      const user = {
        firstName: newUser.firstName,
        id: newUser._id,
        token: newUser.token,
        date: newUser.date
      };

      res.status(200).json({ message: "User sign up !", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

async function updateUser(req, res) {
  const id = req.body.user.id;
  const existingUser = await User.findOne({ _id: id });
  if (!existingUser) {
    res.json({ message: "User not found" });
  } else {
    try {
      const {
        // password,
        firstName,
        lastName,
        phone,
        deliveryAddress,
        billingAddress,
        pets
      } = req.body.user;

      // const token = uid2(16);
      // const salt = uid2(16);
      // const hash = SHA256(password + salt).toString(encBase64);

      existingUser = req.body.user;
      // token,
      // salt,
      // hash,

      await existingUser.save();

      const user = {
        firstName: newUser.firstName,
        id: newUser._id,
        token: newUser.token
      };

      res.status(200).json({ message: "User update", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports.searchUser = searchUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.logIn = logIn;
module.exports.signUp = signUp;
module.exports.updateUser = updateUser;
