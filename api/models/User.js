const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  info: Object,
  isVerified: Boolean,
});
module.exports = mongoose.model("User", UserSchema);
