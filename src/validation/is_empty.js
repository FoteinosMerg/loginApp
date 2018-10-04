"use strict";

/*
Uniform detection of emptiness; returns true if the argument
is undefined, null, an empty object or a zero-length string
*/
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
