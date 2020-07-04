"use strict";

const express = require("express");

let router = express.Router();
const Log = require('../../models/log');


router.get("/", function (req, res,next) {
    Log.find({}, 'log')
    .then(data => res.json(data))
    .catch(next)
});
router.post("/", function (req, res,next) {
    if(req.body.log){
        Log.create(req.body)
          .then(data => res.json(data))
          .catch(next)
      }else {
        res.json({
          error: "The input field is empty"
        })
      }
});
router.get('*', function (req, res, next) {
  res.status(404).send('ERROR')
});
module.exports = router;
