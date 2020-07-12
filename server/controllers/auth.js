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

    sendTokenResponse(user, 201, res);
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

    sendTokenResponse(user, 200, res);
  } catch (ex) {
    res.status(500).json({ success: false, data: ex });
  }
});

// Get token from model,create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if ("environment is production" === true) {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// @desc Get login user
// @route GET /auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  try {
    //check for user
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: false, data: user });
  } catch (ex) {
    res.status(500).json({ success: false, data: ex });
  }
});
