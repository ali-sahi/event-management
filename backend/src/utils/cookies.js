const { fifteenMinutesFromNow } = require("../constants/time");

module.exports = {
  setAuthCookies: (res, accessToken) => {
    return res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: fifteenMinutesFromNow,
    });
  },
  clearAuthCookies: (res) => {
    return res.clearCookie("accessToken");
  },
};
