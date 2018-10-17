"use strict";

const router = require("express").Router();

/* Expansion of `node-jsonebtoken` supporting blacklisting */
const jwt = require("jwt-blacklist")(require("jsonwebtoken"));
jwt.config({ unitType: "h" });
/* Generates a ``deterministic`` GUID, i.e. the same identifier for the same
string at different moments; will be here used to generate token ids needed
for blacklisting */
const aguid = require("aguid");

const passport = require("passport");

const keys = require("../config/keys");
const User = require("../models/User");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

/* @route           POST /api/users/register
   @description     Register user
   @ access         Public */
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

/* @route           GET api/users/login
   @description     Login user (returning JSON web token)
   @ access         Public */
router.post("/login", (req, res) => {
  // Validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.verifyCredentials(
    req.body.username,
    req.body.password,
    (user, verified) => {
      if (verified) {
        // Create token payload (user info plus token id for blacklisting)
        const payload = {
          user_id: user.id,
          username: user.username,
          token_id: aguid()
        };

        // Sign and send token to browser (expires after 60 min)
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "1h" },
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

/* @route         GET api/users/current
   @description   Returns info about currently logged in user
   @access        Private */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

/* @route         GET api/users/logout
   @description   Logs currently logged in user out
   @access        Private */
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let token = req.headers["authorization"] || req.headers["x-access-token"];
    token = token.slice(7, token.length); // Remove 'Bearer '
    jwt.blacklist(token);
    req.logout(); // removes req.user property
    res.redirect("/");
  }
);

module.exports = router;
