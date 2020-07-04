const _ = require("lodash"),
  env = process.env.NODE_ENV || "local",
  envConfig = require("./" + env);

let defaultConfig = {
  env: env,
  urls: {
    API_SUBDOMAIN: "api",
    BASE: "logger.com",
    HOSTNAME: "api.logger.com",
  }
};

module.exports = _.merge(defaultConfig, envConfig);
