const { Router } = require("express");
const { getUserProfile, getAllUsers, deleteUser, changeUserRole } = require("../controllers/user.controller");

const userRoutes = Router();

// prefix ===== /user

userRoutes.get("/get_profile/:userId", getUserProfile);
userRoutes.get("/get_users/:adminId", getAllUsers);
userRoutes.delete("/delete/:adminId", deleteUser);
userRoutes.post("/change_role/:adminId", changeUserRole);

module.exports = userRoutes;
