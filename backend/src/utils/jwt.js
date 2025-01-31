const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/envConstants");
const { UserRole } = require("../constants/roles");

module.exports = {
  signToken: (userId) => {
    return jwt.sign({ userId, role: UserRole }, JWT_SECRET, { expiresIn: "1m" });
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log("JWT VERIFY ERROR", error);
      return null;
    }
  },
};
