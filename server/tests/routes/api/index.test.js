// const request = require("supertest");
const server = require("../../../")(),
  serverConfig = require("../../../../configs");

var request = require("request");

var responses = {
  api: {
    "/": { isSuccess: true, data: "This is api base" },
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
  afterAll(function (done) {
    server.close(() => {
      console.log("\x1b[36m%s\x1b[0m", "♻ server recycled");
      done();
    });
  });
});
