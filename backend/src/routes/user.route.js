const { Router } = require("express");
const { getUserProfile } = require("../controllers/user.controller");

const userRoutes = Router();

// prefix ===== /user

userRoutes.get("/get_profile/:userId", getUserProfile);

module.exports = userRoutes;
