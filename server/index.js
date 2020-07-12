const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

let appServer;
const server = express();

function startMongoServer() {
  // connect to the database
  const serverConf = server.get("config");
  const mongoDbConfig = serverConf.mongodb;
  const mongoDbConnectionString = `${mongoDbConfig.url}/${mongoDbConfig.databaseName}?retryWrites=true&w=majority`;
  mongoose
    .connect(mongoDbConnectionString, { useNewUrlParser: true })
    .then(() => {
      if (serverConf.env !== "test") {
        // console.log("Database connected successfully");
      }
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));

  // since mongoose promise is depreciated, we overide it with node"s promise
  mongoose.Promise = global.Promise;
}

function createServer(config) {
  // Server settings
  server.set("config", config);

  // Returns middleware that parses json
  server.use(bodyParser.json());

  // use cookie parser
  server.use(cookieParser());

  server.use("/public", express.static("server/public"));
  server.use(bodyParser.json());
  server.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err);
    next();
  });
  routes.init(server);
}

function startServer() {
  const { port, hostname, env } = server.get("config");

  startMongoServer(server);
  appServer = server.listen(port, () => {
    if (env !== "test") {
      // eslint-disable-next-line no-console
      console.log(`Express server listening on - http://${hostname}:${port}`);
    }
  });
}
function closeServer() {
  const { env } = server.get("config");
  appServer.close(() => {
    mongoose.disconnect().then(() => {
      if (env !== "test") {
        // eslint-disable-next-line no-console
        console.log("Database disconnected successfully");
      }
    });
  });
}
module.exports = function serverSetup() {
  return {
    create: createServer,
    start: startServer,
    close: closeServer,
  };
};
