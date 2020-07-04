const subdomain = require("express-subdomain");
const apiRoute = require("./api"),
  homeRoute = require("./home");

function init(server) {
  server.use(subdomain(server.get("urls").API_SUBDOMAIN, apiRoute));

  server.get("/", function (req, res) {
    res.redirect("/home");
  });

  server.use("/home", homeRoute);

  server.get("*", function (req, res, next) {
    if (server.get("env") != "test")
      console.log("Request was made to: " + req.originalUrl);
    return next();
  });
}

module.exports = {
  init: init,
};
