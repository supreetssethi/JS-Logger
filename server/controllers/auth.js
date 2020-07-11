const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
var colors = require("colors");

// @desc Register user
// @route Get /auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;
  console.info(colors.blue(name, username, email, password));
  try {
    const user = await User.create({
      name,
      username,
      email,
      password,
    });
    res.status(201).json({ success: true });
  } catch (ex) {
    console.log(colors.red(ex));
    res.status(500).json({ success: false, data: ex });
  }
});
