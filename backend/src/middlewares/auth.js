const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AppError } = require("../utils/errors");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError("Not authorized, no token provided", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Session expired, please log in again", 401));
    }
    return next(new AppError("Invalid token, please log in again", 401));
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("User no longer exists", 401));
  }

  req.user = user;
  next();
});

module.exports = { protect };
