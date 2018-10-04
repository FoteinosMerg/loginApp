"use strict";

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../config/keys");
const User = require("../models/User");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

/* @route     POST users/register
   @route     Register user
   @ access   Public */
router.post("/register", (req, res) => {
  // Validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ username: req.body.username }).then(user => {
    if (user)
      return res.status(400).json({ username: "Username already exists" });

    // Construct user from POST'ed data
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      pwd_repeat: req.body.pwd_repeat
    });

    // Store user in database
    User.storeUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(" * New registry: \n" + user);
      res.json(user);
    });
  });
});

/* @route     GET users/login
   @route     Login user (returning JSON web token)
   @ access   Public */
router.post("/login", (req, res) => {
  // Validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.verifyCredentials(
    req.body.username,
    req.body.password,
    (user, verified) => {
      if (verified) {
        // Create token payload (user info)
        const payload = {
          id: user.id,
          username: user.username
        };

        // Sign and send token to browser (expires after 60 min)
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              verified: true,
              token: "Bearer " + token
            });
          }
        );
      } else return res.status(400).json({ verified: false });
    }
  );
});

/* @route     GET users/current
   @route     Returns info about currently logged in user
   @ access   Private */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

/* @route     GET users/logout
   @route     Logs currently logged in user out
   @ access   Private */
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //req.logout(); // removes req.user property
    //res.redirect("/");
  }
);

module.exports = router;
