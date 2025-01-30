const { z } = require("zod");
const {
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  NOT_FOUND,
  UNAUTHORIZED,
  CREATED,
} = require("../constants/httpStatusCode");
const UserModel = require("../models/user.model");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const { setAuthCookies, clearAuthCookies } = require("../utils/cookies");

const { signToken } = require("../utils/jwt");
const { errorHandler } = require("../utils/errorHandler");

module.exports = {
  registerHandler: async (req, res) => {
    try {
      const request = registerSchema.parse({
        ...req.body,
      });

      const { email } = req.body;

      const existingUser = await UserModel.exists({
        email,
      });

      if (existingUser) {
        return res.status(CONFLICT).json({ message: "User with this email already exist" });
      }

      const user = await UserModel.create({ ...request });

      const accessToken = signToken(user._id);

      const userWithoutPassword = user.omitPassword();

      return setAuthCookies(res, accessToken)
        .status(CREATED)
        .json({ message: "User Registered Successfully", user: userWithoutPassword });
    } catch (error) {
      errorHandler(res, error, "Error Creating User");
    }
  },

  loginHandler: async (req, res) => {
    try {
      const validatedData = loginSchema.parse({
        ...req.body,
      });

      const { email, password } = validatedData;

      console.log("paswordddd", password);

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(NOT_FOUND).json({ message: "Invalid email or password" });
      }
      const isValid = await user.comparePassword(password);

      if (!isValid) {
        return res.status(UNAUTHORIZED).json({ message: "Invalid email or password" });
      }

      const accessToken = signToken(user._id);
      const userWithoutPassword = user.omitPassword();

      return setAuthCookies(res, accessToken)
        .status(OK)
        .json({ message: "Login successful", user: userWithoutPassword });
    } catch (error) {
      console.log("RESGISTER HANDLER", error);
      res.status(INTERNAL_SERVER_ERROR).json({ message: "Error Loggin In" });
    }
  },
  logoutHandler: async (req, res) => {
    try {
      return clearAuthCookies(res).status(OK).json({ message: "Logout successful" });
    } catch (error) {
      console.log("LOGOUT HANDLER", error);
      res.status(INTERNAL_SERVER_ERROR).json({ message: "Error Loggin Out" });
    }
  },
};
