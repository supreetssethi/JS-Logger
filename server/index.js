const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

module.exports = function () {
  let server = express(),
    create,
    start;

  create = function (config) {
    let routes = require("./routes");

    // Server settings
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);
    server.set("mongodb", config.mongodb);
    server.set("viewDir", config.viewDir);

    //connect to the database
    let mongoDbConfig = server.get("mongodb");
    let mongoDbConnectionString = `${mongoDbConfig.url}/${mongoDbConfig.databaseName}?retryWrites=true&w=majority`;
    mongoose
      .connect(mongoDbConnectionString, { useNewUrlParser: true })
      .then(() => console.log(`Database connected successfully`))
      .catch((err) => console.log(err));

    //since mongoose promise is depreciated, we overide it with node's promise
    mongoose.Promise = global.Promise;
    // Returns middleware that parses json
    // server.use(bodyParser.json());

    // Setup view engine
    // server.engine('.hbs', expressHandlebars({
    //     defaultLayout: 'default',
    //     layoutsDir: config.viewDir + '/layouts',
    //     extname: '.hbs'
    // }));
    // server.set('views', server.get('viewDir'));
    // server.set('view engine', '.hbs');

    // Set up routes

    server.use(bodyParser.json());
    server.use((err, req, res, next) => {
      console.log(err);
      next();
    });
    routes.init(server);
  };

  start = function () {
    let hostname = server.get("hostname"),
      port = server.get("port");

    server.listen(port, function () {
      console.log(
        "Express server listening on - http://" + hostname + ":" + port
      );
    });
  };

  return {
    create: create,
    start: start,
  };
};
