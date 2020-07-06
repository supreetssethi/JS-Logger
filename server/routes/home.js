const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("home base");
});
router.get("/info", (req, res) => {
  res.send("home info");
});

module.exports = router;
