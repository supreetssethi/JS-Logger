/* eslint-disable no-console */
const fetch = require("node-fetch");
const server = require("../../..")();
const serverConfig = require("../../../../configs");

let token;
describe("Testing log api end point", () => {
  beforeAll(async (done) => {
    server.create(serverConfig);
    server.start();
    console.log("\x1b[36m%s\x1b[0m", "♻ server started");

    const body = {
      email: "supreet.s.sethi@gmail.com",
      password: "suprit12",
    };
    const res = await fetch(
      `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/auth/login/`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      },
    );
    const json = await res.json();
    console.log(json);
    token = json.token;
    console.log("\x1b[36m%s\x1b[0m", `♻ user logged in with token ${token}`);
    done();
  });

  it(`GET ${serverConfig.urls.HOSTNAME}:${serverConfig.port}/log/`, async (done) => {
    const res = await fetch(
      `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/log/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const json = await res.json();
    expect(res.status).toEqual(200);
    expect(json).toHaveProperty("logs");
    done();
  });

  it(`POST ${serverConfig.urls.HOSTNAME}:${serverConfig.port}/log/`, async (done) => {
    const body = {
      data: "new error",
    };
    const res = await fetch(
      `http://${serverConfig.urls.HOSTNAME}:${serverConfig.port}/log/`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const json = await res.json();
    expect(res.status).toEqual(201);
    expect(json).toHaveProperty("log");
    done();
  });

  afterAll((done) => {
    server.close(() => {
      console.log("\x1b[36m%s\x1b[0m", "♻ server recycled");
      done();
    });
  });
});
