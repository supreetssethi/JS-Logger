const express = require("express");
const cors = require("cors");

const logRouter = require("./log");
const healthcheckRouter = require("./healthcheck");
const authRouter = require("./auth");

const whitelist = ["http://logger.com:3000"];
const corsOptionsDelegate = function corsOptionsDelegate(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

const router = express.Router();

router.use("/log", cors(corsOptionsDelegate), logRouter);
router.use("/health", cors(corsOptionsDelegate), healthcheckRouter);
router.use("/auth", cors(corsOptionsDelegate), authRouter);

router.get("*", function pageNotFound(req, res, next) {
  res.status(404).send("ERROR");
  return next();
});

module.exports = router;
