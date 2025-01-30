const { OK } = require("../constants/httpStatusCode");
const UserModel = require("../models/user.model");
const { errorHandler } = require("../utils/errorHandler");
module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId);
      const userWithoutPassword = user.omitPassword();
      console.log("user", userWithoutPassword);
      res.status(OK).json({ message: "Profile Successfully Fetched", user: userWithoutPassword });
    } catch (error) {
      errorHandler(res, error, "Error getting Profile Information");
    }
  },
};
