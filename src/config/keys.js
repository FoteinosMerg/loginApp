"use strict";
/*
Keys for this application are:

mongoURI    - a string formatted URI referring to a remote MongoDB
              (containing username and password of the DB admin)
secretOrKey - a string used for token encryption

They are referenced from outside as

keys.mongoURI, keys.secretOrKey

respectively; cf. ./prod.js to see how to configure these environmental
variables in production
*/

if (process.env.NODE_ENV === "production") module.exports = require("./prod");
else module.exports = require("./dev"); // File not to be commited for deployment
