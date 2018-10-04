const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateInput(data) {
  let errors = {};

  /* Stringify as zero-length string in case of emptiness, so
     so that they anycase be insertible to Validator.isEmpty */
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.pwd_repeat = !isEmpty(data.pwd_repeat) ? data.pwd_repeat : "";

  if (!Validator.isLength(data.username, { min: 2, max: 24 }))
    errors.username = "Username must be between 2 and 24 characters";

  if (Validator.isEmpty(data.username))
    errors.username = "Username field is required";

  if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

  if (Validator.isEmpty(data.email)) errors.email = "Email field is required";

  if (!Validator.isLength(data.password, { min: 8 }))
    errors.password = "Password must be at least 8 characters";

  if (Validator.isEmpty(data.password))
    errors.password = "Password field is required";

  if (!Validator.equals(data.password, data.pwd_repeat))
    errors.pwd_repeat = "Passwords must match";

  if (Validator.isEmpty(data.pwd_repeat))
    errors.pwd_repeat = "Repeat password field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
