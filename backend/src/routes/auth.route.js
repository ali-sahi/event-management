const { Router } = require("express");

const authRoutes = Router();

const { registerHandler, loginHandler, logoutHandler } = require("../controllers/auth.controller");

// prefix: /auth

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);

module.exports = authRoutes;
