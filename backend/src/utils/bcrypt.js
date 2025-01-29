const bcrypt = require("bcrypt");

module.exports = {
  hashValue: async (val, saltRounds) => bcrypt.hash(val, saltRounds || 10),
  compareValue: async (val, hashedValue) => bcrypt.compare(val, hashedValue).catch(() => false),
};
