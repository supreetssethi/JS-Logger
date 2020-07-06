const express = require("express");
const mongoose = require("mongoose");

const router = express.Router({});

router.get("/", async (req, res) => {
  const healthcheck = {};
  try {
    // checking server uptime and basic data
    healthcheck.dbState = mongoose.STATES[mongoose.connection.readyState];
    res.json({
      isSuccess: true,
      data: healthcheck,
    });
  } catch (e) {
    healthcheck.message = e.toString();
    res.status(503).json({
      isSuccess: false,
      data: healthcheck,
    });
  }
});

// export router with all routes included
module.exports = router;
