const { z } = require("zod");
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../constants/httpStatusCode");

const errorHandler = (res, error, customMessage = "there is an error") => {
  if (error instanceof z.ZodError) {
    console.log("Zod Error", error);
    return res.status(BAD_REQUEST).json({ message: error.errors[0].message });
  }
  console.log(error);
  res.status(INTERNAL_SERVER_ERROR).json({ message: customMessage });
};

module.exports = { errorHandler };
