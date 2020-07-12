const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
var colors = require("colors");

// @desc Register user
// @route POST /auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    // create token
    const token = user.getSignedJWTToken();

    res.status(201).json({ success: true, token: token });
  } catch (ex) {
    res.status(500).json({ success: false, data: ex });
  }
});

// @desc Login user
// @route POST /auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //validate email and password
  if (!email || !password)
    return next(new ErrorResponse("Please provide an email and password", 400));
  try {
    //check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorResponse("User not found", 401));

    // check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

    // create token
    const token = user.getSignedJWTToken();
    res.status(200).json({ success: true, token: token });
  } catch (ex) {
    res.status(500).json({ success: false, data: ex });
  }
});
