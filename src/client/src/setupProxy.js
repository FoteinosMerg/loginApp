const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/users/register", { target: "http://localhost:5000" }));
};
