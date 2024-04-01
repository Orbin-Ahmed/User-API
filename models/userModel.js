const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Username is mendatory"] },
    email: { type: String, required: [true, "Email is mendatory"] },
    password: { type: String, required: [true, "Password is mendatory"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
