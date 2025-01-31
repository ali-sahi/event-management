const { UNAUTHORIZED } = require("../constants/httpStatusCode");
const { verifyToken } = require("../utils/jwt");

module.exports.authenticate = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    const decodeInfo = verifyToken(accessToken);

    if (!decodeInfo) {
      console.log("Token Decode Unsucesss");
      return res.status(UNAUTHORIZED).json({ message: "Token expired decode" });
    }

    console.log("Token Decode Success");

    const { userId, role } = decodeInfo;

    req.userId = userId;
    req.role = role;

    next();
  } catch (error) {
    console.Error("Authenticate Middleware Error");
    return res.status(UNAUTHORIZED).json({ message: "Session expired, please log in again" });
  }
};
