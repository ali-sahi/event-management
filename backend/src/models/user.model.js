const { default: mongoose } = require("mongoose");
const { compareValue, hashValue } = require("../utils/bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  return next();
});

userSchema.methods.comparePassword = async function (val) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.isAdmin = async function (adminId) {
  const user = await this.findById(adminId);
  return user?.role === "admin";
};

userSchema.statics.isUser = async function (userId) {
  const user = await this.findById(userId);
  return user?.role === "user";
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
