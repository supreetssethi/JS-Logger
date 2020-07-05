const express = require("express");
const mongoose = require("mongoose");

const router = express.Router({});

router.get("/", async (_req, res, _next) => {
  try {
    // checking server uptime and basic data
    let healthcheck = {
      uptime: process.uptime(),
      message: "UP",
      timestamp: Date.now(),
      dbState: mongoose.STATES[mongoose.connection.readyState],
    };
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
