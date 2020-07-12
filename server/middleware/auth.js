const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const colors = require("colors");

const User = require("../models/User");

//Protect routes

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exisits
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    //verify token
    const decoded = jwt.verify(token, "hasfnasdjfgkjhyn4567jkfg6546nk57u8");

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
