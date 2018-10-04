const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateInput(data) {
  let errors = {};

  /* Stringify as zero-length string in case of emptiness, so
     so that they anycase be insertible to Validator.isEmpty */
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username))
    errors.username = "Username field is required";

  if (Validator.isEmpty(data.password))
    errors.password = "Password field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
