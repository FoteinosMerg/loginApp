"use strict";

/* Configures JSON web token strategy for passport middleware */

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

/* mongoose.model("users", require("../models/User").UserSchema);
   if model User had not been loaded inside index.js */
const User = mongoose.model("users");
const keys = require("../config/keys");

// Configure JWT strategy options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(" * Logged in user authenticated:");
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
