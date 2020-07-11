const express = require("express");
const fs = require("fs");

const router = express.Router();
const Log = require("../../models/log");

function mergeCurrentDataWithFie(data, req) {
  const obj = JSON.parse(data);
  obj.push(req.body);
  return JSON.stringify(obj);
}
// eslint-disable-next-line no-console
router.get("/", (req, res, next) => {
  Log.find({}, "data")
    .then((data) => res.json({ isSuccess: true, logs: data }))
    .catch(next);
});
function writeOutPutToFile(data, req, callback) {
  fs.writeFile(
    "myjsonfile.json",
    mergeCurrentDataWithFie(data, req),
    "utf8",
    () => {
      callback && callback();
    },
  );
}

router.post("/", async (req, res) => {
  if (req.body.data) {
    fs.readFile("myjsonfile.json", "utf8", function readFileCallback(
      err,
      data,
    ) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        writeOutPutToFile(data, req, () => {
          res.status(201).json({ isSuccess: true, log: data });
        });
      }
    });
  } else {
    res.status(500).json({ error: "The input field is empty" });
  }
});
router.get("*", (req, res, next) => {
  res.status(404).send("ERROR");
  return next();
});
module.exports = router;
