const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const isAuthenticated = require("../middlewares/isAuthenticated");

const User = require("../models/User.js");

router.post("/signup", function(req, res, next) {
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.body.password + salt).toString(encBase64);

  const user = new User({
    email: req.body.email,
    token: token,
    salt: salt,
    hash: hash,
    account: {
      username: req.body.username,
      phone: req.body.phone
    }
  });
  user.save(function(err) {
    if (err) {
      return next(err.message);
    } else {
      return res.json({
        _id: user._id,
        token: user.token,
        account: user.account
      });
    }
  });
});

router.get("/:id", isAuthenticated, function(req, res, next) {
  User.findById(req.params.id)
    .select("account")
    .populate("account.rooms")
    .populate("account.favorites")
    .exec()
    .then(function(user) {
      if (!user) {
        res.status(404);
        return next("User not found");
      }

      return res.json({
        _id: user._id,
        account: user.account
      });
    })
    .catch(function(err) {
      res.status(400);
      return next(err.message);
    });
});

module.exports = router;
