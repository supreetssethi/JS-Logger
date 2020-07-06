const subdomain = require("express-subdomain");
const apiRoute = require("./api");
const homeRoute = require("./home");

function init(server) {
  server.use(subdomain(server.get("urls").API_SUBDOMAIN, apiRoute));

  server.get("/", (req, res) => {
    res.redirect("/home");
  });

  server.use("/home", homeRoute);

  server.get("*", (req, res, next) => {
    res.status(404).send("ERROR");
    return next();
  });
}

module.exports = {
  init,
};
