"use strict";

// Load and execute at booting; order matters!
require("./models/User");
require("./services/passport");

// Load application keys
const keys = require("./config/keys");

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true } // Overcomes deprecation warning
  )
  .then(() => console.log(" * MongoDB successfully connected"))
  .catch(err => console.log(" * MongoDB connection refused"));

// Initialize app
const message = "A minimal log in application with json web tokens";
const express = require("express");
const app = express();

// Attach body parser middleware
const bodyParser = require("body-parser"); // JSON readability module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Attach passport and local strategy configuration
const passport = require("passport");
app.use(passport.initialize());
require("./services/passport")(passport);

// Routing
app.get(["/", "/index"], (req, res) => res.send(message));
app.get(["/api/test", "/index"], (req, res) => res.send("Test api proxy"));
app.use("/api/users", require("./routes/users"));

// Bind dynamically to port and display server-side messages
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n * ${message}`);
  console.log(` * Server running on port ${PORT}`);
});
