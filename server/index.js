const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

module.exports = function serverSetup() {
  let appServer;
  const server = express();

  const create = function createServer(config) {
    // Server settings
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);
    server.set("mongodb", config.mongodb);
    server.set("viewDir", config.viewDir);
    server.set("urls", config.urls);

    // Returns middleware that parses json
    // server.use(bodyParser.json());

    // Setup view engine
    // server.engine(".hbs", expressHandlebars({
    //     defaultLayout: "default",
    //     layoutsDir: config.viewDir + "/layouts",
    //     extname: ".hbs"
    // }));
    // server.set("views", server.get("viewDir"));
    // server.set("view engine", ".hbs");

    // Set up routes

    server.use(bodyParser.json());
    server.use((err, req, res, next) => {
      // eslint-disable-next-line no-console
      console.log(err);
      next();
    });
    routes.init(server);
  };

  const start = function startServer() {
    const port = server.get("port");

    // connect to the database
    const mongoDbConfig = server.get("mongodb");
    const mongoDbConnectionString = `${mongoDbConfig.url}/${mongoDbConfig.databaseName}?retryWrites=true&w=majority`;
    mongoose
      .connect(mongoDbConnectionString, { useNewUrlParser: true })
      .then(() => {
        if (server.get("env") !== "test") {
          // console.log("Database connected successfully");
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));

    // since mongoose promise is depreciated, we overide it with node"s promise
    mongoose.Promise = global.Promise;
    appServer = server.listen(port, () => {
      if (server.get("env") !== "test") {
        // console.log(`Express server listening on - http://${hostname}:${port}`);
      }
    });
  };
  const close = function closeServer(callback) {
    appServer.close(() => {
      mongoose.disconnect().then(() => {
        if (server.get("env") !== "test") {
          // console.log("Database disconnected successfully");
        }
      });
      if (callback) callback();
    });
  };

  return {
    create,
    start,
    close,
  };
};
