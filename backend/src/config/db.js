const mongoose = require("mongoose");

const { MONGO_URI } = require("../constants/envConstants");

module.exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conected to Database Successfully");
  } catch (error) {
    console.error("Coud not connect to Database", error);
    process.exit(1);
  }
};
