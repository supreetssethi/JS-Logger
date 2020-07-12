/* eslint-disable no-console */
const fetch = require("node-fetch");
const server = require("../../..")();
const serverConfig = require("../../../../configs");

describe("Testing health check api end point", () => {
  beforeAll((done) => {
    server.create(serverConfig);
    server.start();
    console.log("\x1b[36m%s\x1b[0m", "♻ server started");
    done();
  });

  it(`GET ${serverConfig.urls.HOSTNAME}:${serverConfig.port}/health/`, async (done) => {
    const res = await fetch(
      `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/health/`,
    );
    const json = await res.json();
    expect(res.status).toEqual(200);
    expect(json.data.dbState).not.toEqual("disconnected");
    done();
  });

  afterAll((done) => {
    server.close(() => {
      console.log("\x1b[36m%s\x1b[0m", "♻ server recycled");
      done();
    });
  });
});
