const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  twitterId: { type: String, unique: true }, // Twitter user's unique identifier
  // accessToken: { type: String }, // Twitter access token
  // refreshToken: { type: String }, // Twitter refresh token
});

const User = mongoose.model("User", userSchema);

module.exports = User;
