const { Router } = require("express");
const { getUserProfile, getAllUsers, deleteUser, changeUserRole } = require("../controllers/user.controller");

const userRoutes = Router();

// prefix ===== /user

userRoutes.get("/get_profile", getUserProfile);
userRoutes.get("/get_users", getAllUsers);
userRoutes.delete("/delete", deleteUser);
userRoutes.post("/change_role", changeUserRole);

module.exports = userRoutes;
