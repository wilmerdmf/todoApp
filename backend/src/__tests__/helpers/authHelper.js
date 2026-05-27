const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const createTestUser = async (overrides = {}) => {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    ...overrides,
  };

  const user = await User.create(userData);
  return user;
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const getAuthCookie = (userId) => {
  const token = generateToken(userId);
  return `token=${token}`;
};

module.exports = { createTestUser, generateToken, getAuthCookie };
