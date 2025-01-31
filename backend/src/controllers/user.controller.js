const { OK, UNAUTHORIZED } = require("../constants/httpStatusCode");
const UserModel = require("../models/user.model");
const { errorHandler } = require("../utils/errorHandler");
module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req;
      const isAdmin = await UserModel.isAdmin(userId);
      const isUser = await UserModel.isUser(userId);

      if (isUser || isAdmin) {
        const user = await UserModel.findById(userId);
        const userWithoutPassword = user.omitPassword();
        return res.status(OK).json({ message: "Profile Successfully Fetched", user: userWithoutPassword });
      }

      res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    } catch (error) {
      errorHandler(res, error, "Error getting Profile Information");
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const { userId } = req;

      const isAdmin = await UserModel.isAdmin(userId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      const allUsers = await UserModel.find({ _id: { $ne: userId } });
      const allUserWithouPassword = allUsers.map((user) => user.omitPassword());

      res.status(OK).json({ message: "Users Fetched Successfully", allUsers: allUserWithouPassword });
    } catch (error) {
      errorHandler(res, error, "Error Fetching all Users");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId: adminId } = req;

      const isAdmin = await UserModel.isAdmin(adminId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      const { userId } = req.body;

      await UserModel.deleteOne({ _id: userId });

      res.status(OK).json({ message: "User Deleted Successfully" });
    } catch (error) {
      errorHandler(res, error, "Error Fetching all Users");
    }
  },
  changeUserRole: async (req, res) => {
    try {
      const { userId: adminId } = req;

      const isAdmin = await UserModel.isAdmin(adminId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      const { userId, role } = req.body;

      await UserModel.findByIdAndUpdate(userId, { role });

      res.status(OK).json({ message: "User Status Change Successfully" });
    } catch (error) {
      errorHandler(res, error, "Error Fetching all Users");
    }
  },
};
