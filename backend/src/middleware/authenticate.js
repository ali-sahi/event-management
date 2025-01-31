const { UNAUTHORIZED } = require("../constants/httpStatusCode");
const { verifyToken } = require("../utils/jwt");

module.exports.authenticate = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    const decodeInfo = verifyToken(accessToken);

    if (!decodeInfo) {
      return res.status(UNAUTHORIZED).json({ message: "Token expired decode" });
    }

    const { userId, role } = decodeInfo;

    req.userId = userId;
    req.role = role;

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: "Session expired, please log in again" });
  }
};
