const express = require("express");
const logRouter = require("./log");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    isSuccess: true,
    data: "This is api base",
  });
});
router.get("/isAlive", (req, res) => {
  res.json({
    isSuccess: true,
  });
});
router.get("/info", (req, res) => {
  res.send("api info");
});
router.use("/log", logRouter);
router.get("*", (req, res, next) => {
  res.status(404).send("ERROR");
  return next();
});
module.exports = router;
