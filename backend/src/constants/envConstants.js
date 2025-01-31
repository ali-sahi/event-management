require("dotenv").config({ path: "../.env" });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  APP_ORIGIN: process.env.APP_ORIGIN,
  JWT_SECRET: process.env.JWT_SECRET,
};
