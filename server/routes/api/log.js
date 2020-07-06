const express = require("express");

const router = express.Router();
const Log = require("../../models/log");

router.get("/", (req, res, next) => {
  Log.find({}, "data")
    .then((data) => res.json({ isSuccess: true, logs: data }))
    .catch(next);
});
router.post("/", (req, res, next) => {
  if (req.body.data) {
    Log.create(req.body)
      .then((data) => {
        res.status(201);
        res.json({ isSuccess: true, log: data });
      })
      .catch(next);
  } else {
    res.status(500);
    res.json({
      error: "The input field is empty",
    });
  }
});
router.get("*", (req, res, next) => {
  res.status(404).send("ERROR");
  return next();
});
module.exports = router;
