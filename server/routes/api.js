"use strict";

const express = require("express");

let router = express.Router();


router.get("/", function (req, res) {
  res.send("api base");
});
router.get("/info", function (req, res) {
  res.send("api info");
});
router.get('*', function (req, res, next) {
  res.status(404).send('ERROR')
});
module.exports = router;
