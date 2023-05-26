const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  photo: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
