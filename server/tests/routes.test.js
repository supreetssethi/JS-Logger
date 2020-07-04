// const request = require("supertest");
const server = require("../")(),
  serverConfig = require("../../configs");

var request = require("request");

var responses = {
  main: {
    "/": "Simple example homepage!",
  },
  api: {
    "/": { isSuccess: true, data: "This is api base" },
    "/isAlive": { isSuccess: true },
  },
};
describe("Test api endpoint", () => {
  beforeAll(function (done) {
    server.create(serverConfig);
    server.start();
    console.log("\x1b[36m%s\x1b[0m", "♻ server started");
    done();
  });

  it(
    "GET " + serverConfig.urls.HOSTNAME + ":" + serverConfig.port + "/",
    function (done) {
      request(
        "http://" + serverConfig.urls.HOSTNAME + ":" + serverConfig.port + "/",
        function (error, res, body) {
          expect(body).toEqual(JSON.stringify(responses.api["/"]));
          done();
        }
      );
    }
  );

  it(
    "GET " + serverConfig.urls.HOSTNAME + ":" + serverConfig.port + "/isAlive",
    function (done) {
      request(
        "http://" +
          serverConfig.urls.HOSTNAME +
          ":" +
          serverConfig.port +
          "/isAlive",
        function (error, res, body) {
          expect(body).toEqual(JSON.stringify(responses.api["/isAlive"]));
          done();
        }
      );
    }
  );

  afterAll(function (done) {
    server.close(() => {
      console.log("\x1b[36m%s\x1b[0m", "♻ server recycled");
      done();
    });
  });
});
