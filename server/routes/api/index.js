const express = require("express");
const logRouter = require("./log");
const healthcheckRouter = require("./healthcheck");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    isSuccess: true,
    data: "This is api base",
  });
});

router.use("/log", logRouter);
router.use("/health", healthcheckRouter);
router.get("*", function (req, res, next) {
  res.status(404).send("ERROR");
  return next();
});
module.exports = router;
