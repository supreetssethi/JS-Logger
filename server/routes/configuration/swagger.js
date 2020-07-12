const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  info: {
    title: "JS-logger", // Title of the documentation
    version: "1.0.0", // Version of the app
    description: "JS-logger api documentation", // short description of the app
    license: {
      name: "MIT",
      url: "https://choosealicense.com/licenses/mit/",
    },
    contact: {
      name: "Supreet Sethi",
      // url: "https://swagger.io",
      email: "supreet.s.sethi@gmail.com",
    },
  },
  servers: [
    {
      url: "http://api.logger.com:3000",
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
    ApiKeyAuth: { type: "apiKey", in: "header", name: "X-API-Key" },
  },
  // security: [
  //   {
  //     bearerAuth: [],
  //     Bearer: [],
  //   },
  // ],
  host: "api.logger.com:3000",
  validatorUrl: null,
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
