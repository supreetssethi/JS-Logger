const fetch = require("node-fetch");
const server = require("../../../")(),
  serverConfig = require("../../../../configs");

describe("Testing log api end point", () => {
  beforeAll(function (done) {
    server.create(serverConfig);
    server.start();
    console.log("\x1b[36m%s\x1b[0m", "♻ server started");
    done();
  });

  it(
    "GET " + serverConfig.urls.HOSTNAME + ":" + serverConfig.port + "/log/",
    async (done) => {
      const res = await fetch(
        `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/log/`
      );
      const json = await res.json();
      expect(res.status).toEqual(200);
      expect(json).toHaveProperty("logs");
      done();
    }
  );

  it(
    "POST " + serverConfig.urls.HOSTNAME + ":" + serverConfig.port + "/log/",
    async (done) => {
      const body = {
        data: "new error",
      };
      const res = await fetch(
        `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/log/`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await res.json();
      expect(res.status).toEqual(201);
      expect(json).toHaveProperty("log");
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
