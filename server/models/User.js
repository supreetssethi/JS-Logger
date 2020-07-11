const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

// create schema for log
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please add a username"],
  },
  email: {
    type: String,
    required: [true, "Please add a name"],
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "viewer"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create model for user
const User = mongoose.model("User", UserSchema);

module.exports = User;
