"use strict";

const express = require("express");
let logRouter = require("./log");
let router = express.Router();

router.get("/", function (req, res) {
  res.json({
    isSuccess: true,
    data: "This is api base",
  });
});
router.get("/isAlive", function (req, res) {
  res.json({
    isSuccess: true,
  });
});
router.get("/info", function (req, res) {
  res.send("api info");
});
router.use("/log", logRouter);
router.get("*", function (req, res, next) {
  res.status(404).send("ERROR");
});
module.exports = router;
