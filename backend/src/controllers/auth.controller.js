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

module.exports = {
  registerHandler: async (req, res) => {
    try {
      const data = {
        email: "alisahi@gmail.com",
        password: "123456789",
        confirmPassword: "123456789",
      };

      const request = registerSchema.parse({
        ...data,
      });

      const existingUser = await UserModel.exists({
        email: data.email,
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
      console.log("RESGISTER HANDLER", error);
      res.status(INTERNAL_SERVER_ERROR).json({ message: "Error Creating User" });
    }
  },

  loginHandler: async (req, res) => {
    try {
      const data = {
        email: "alisahi@gmail.com",
        password: "123456789",
      };
      const validatedData = loginSchema.parse({
        ...data,
      });

      const { email, password } = validatedData;

      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(NOT_FOUND).json({ message: "Invalid email or password" });
      }
      const isValid = await user.comparePassword(password);

      if (!isValid) {
        res.status(UNAUTHORIZED).json({ message: "Invalid email or password" });
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
