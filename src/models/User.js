"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const User = (module.exports = mongoose.model("users", UserSchema));

module.exports.findUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  User.findOne({ username: username }, callback);
};

module.exports.storeUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.verifyCredentials = (username, password, callback) => {
  User.findOne({ username: username }).then(user => {
    if (user) {
      bcrypt // Perform hash comparison for verification
        .compare(password, user.password)
        .then(verified => callback(user, verified))
        .catch(err => console.log(err));
    } else callback(null, false);
  });
};
