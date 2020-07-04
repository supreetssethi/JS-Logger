"use strict";

const express = require("express");

let router = express.Router();

// router.get('/', homeController.index);
// router.get('/info', homeController.info);

router.get("/", function (req, res) {
  res.send("home base");
});
router.get("/info", function (req, res) {
  res.send("home info");
});

module.exports = router;
