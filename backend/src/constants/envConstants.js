require("dotenv").config({ path: "../.env" });

module.exports.NODE_ENV = process.env.NODE_ENV;
module.exports.PORT = process.env.PORT;
module.exports.MONGO_URI = process.env.MONGO_URI;
module.exports.APP_ORIGIN = process.env.APP_ORIGIN;
module.exports.JWT_SECRET = process.env.JWT_SECRET;
module.exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
