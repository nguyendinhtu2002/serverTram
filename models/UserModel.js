const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    sex: {
      type: String,
      default: "Nam",
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        phoneNumber: {
          type: String,
        },
        address: {
          type: String,
        },
        ward: {
          type: String,
        },
        district: {
          type: String,
        },
        city: {
          type: String,
        },
        code: [String],
      },
    ],
    wishList: [String],
    isAdmin: {
      type: Boolean,
      // required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

module.exports = User;
