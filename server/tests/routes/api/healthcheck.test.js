const fetch = require("node-fetch");
const server = require("../../..")(),
  serverConfig = require("../../../../configs");

describe("Testing health check api end point", () => {
  beforeAll(function (done) {
    server.create(serverConfig);
    server.start();
    console.log("\x1b[36m%s\x1b[0m", "♻ server started");
    done();
  });

  it(
    "GET " + serverConfig.urls.HOSTNAME + ":" + serverConfig.port + "/health/",
    async (done) => {
      const res = await fetch(
        `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/health/`
      );
      const json = await res.json();
      expect(res.status).toEqual(200);
      // uptime greater than 0
      expect(json.data.uptime).toBeGreaterThan(0);
      // status is ok
      expect(json.data.message).toEqual("UP");
      expect(json.data.dbState).not.toEqual("disconnected");
      done();
    }
  );

 
  afterAll(function (done) {
    server.close(() => {
      console.log("\x1b[36m%s\x1b[0m", "♻ server recycled");
      done();
    });
  });
});
