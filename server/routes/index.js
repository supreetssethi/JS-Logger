const cors = require("cors");
const subdomain = require("express-subdomain");
const swaggerUi = require("swagger-ui-express");
const apiRoute = require("./api");
const homeRoute = require("./home");
const swaggerSpec = require("./configuration/swagger");
const errorHandler = require("../middleware/error");

const handleErrors = (server) => {
  server.use(errorHandler);

  // error handler
  server.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
};
function init(server) {
  server.use(cors());
  server.use(subdomain(server.get("urls").API_SUBDOMAIN, apiRoute));

  server.get("/", (req, res) => {
    res.redirect("/home");
  });

  server.use("/home", homeRoute);

  // use swagger-Ui-express for your app documentation endpoint
  server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  server.get("*", (req, res, next) => {
    res.status(404).send("ERROR");
    return next();
  });
  handleErrors(server);
}
// Handled unhandled promise rejections
process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
module.exports = {
  init,
};
