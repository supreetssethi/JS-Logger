const subdomain = require("express-subdomain");

const apiRoute = require("./api"),
  homeRoute = require("./home");

function init(server) {
  server.use(subdomain("api", apiRoute));

  server.get("/", function (req, res) {
    res.redirect("/home");
  });

  server.use("/home", homeRoute);

  server.get("*", function (req, res, next) {
    console.log("Request was made to: " + req.originalUrl);
    return next();
  });
}

module.exports = {
  init: init,
};
