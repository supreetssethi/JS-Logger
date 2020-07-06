/* eslint-disable no-console */
const request = require("request");
const server = require("../../..")();
const serverConfig = require("../../../../configs");

const responses = {
  api: {
    "/": { isSuccess: true, data: "This is api base" },
    "/isAlive": { isSuccess: true },
  },
};
describe("Test api endpoint", () => {
  beforeAll((done) => {
    server.create(serverConfig);
    server.start();
    console.log("\x1b[36m%s\x1b[0m", "♻ server started");
    done();
  });

  it(`GET ${serverConfig.urls.HOSTNAME}:${serverConfig.port}/`, (done) => {
    request(
      `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/`,
      (error, res, body) => {
        expect(body).toEqual(JSON.stringify(responses.api["/"]));
        done();
      }
    );
  });

  it(`GET ${serverConfig.urls.HOSTNAME}:${serverConfig.port}/isAlive`, (done) => {
    request(
      `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/isAlive`,
      (error, res, body) => {
        expect(body).toEqual(JSON.stringify(responses.api["/isAlive"]));
        done();
      }
    );
  });

  afterAll((done) => {
    server.close(() => {
      console.log("\x1b[36m%s\x1b[0m", "♻ server recycled");
      done();
    });
  });
});
