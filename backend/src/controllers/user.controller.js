const { OK, UNAUTHORIZED } = require("../constants/httpStatusCode");
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
  getAllUsers: async (req, res) => {
    try {
      const { adminId } = req.params;
      const isAdmin = await UserModel.isAdmin(adminId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      const allUsers = await UserModel.find({ _id: { $ne: adminId } });
      const allUserWithouPassword = allUsers.map((user) => user.omitPassword());

      res.status(OK).json({ message: "Users Fetched Successfully", allUsers: allUserWithouPassword });
    } catch (error) {
      errorHandler(res, error, "Error Fetching all Users");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { adminId } = req.params;
      const { userId } = req.body;

      const isAdmin = await UserModel.isAdmin(adminId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      await UserModel.deleteOne({ _id: userId });

      res.status(OK).json({ message: "User Deleted Successfully" });
    } catch (error) {
      errorHandler(res, error, "Error Fetching all Users");
    }
  },
  changeUserRole: async (req, res) => {
    try {
      const { adminId } = req.params;
      const { userId, role } = req.body;

      const isAdmin = await UserModel.isAdmin(adminId);

      if (!isAdmin) {
        return res.status(UNAUTHORIZED).json({ message: "Not Allowed" });
      }

      await UserModel.findByIdAndUpdate(userId, { role });

      res.status(OK).json({ message: "User Status Change Successfully" });
    } catch (error) {
      errorHandler(res, error, "Error Fetching all Users");
    }
  },
};
