const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  info: {
    title: "JS-logger", // Title of the documentation
    version: "1.0.0", // Version of the app
    description: "JS-logger api documentation", // short description of the app
  },
  host: "api.logger.com:3000", // the host or url of the app
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [path.resolve(__dirname, "../api/docs/*.yaml")],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
