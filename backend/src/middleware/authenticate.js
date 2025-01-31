const { JWT_SECRET } = require("../constants/envConstants");
const { UNAUTHORIZED } = require("../constants/httpStatusCode");
const { verifyToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    console.info("Middleware accessToken");
    console.info("Acess Token", accessToken);

    const decodeInfo = verifyToken(accessToken);

    if (!decodeInfo) {
      console.log("No Decode Token");
      return res.status(UNAUTHORIZED).json({ message: "Token expired decode" });
    }

    const { userId, role } = decodeInfo;

    console.error("Decoded Info", decodeInfo);

    req.userId = userId;
    req.role = role;

    next();
  } catch (error) {
    console.Error("Authenticate Middleware Error");
    return res.status(UNAUTHORIZED).json({ message: "Session expired, please log in again" });
  }
};
