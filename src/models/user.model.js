const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: { type: [String], default: [] },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema, "users");

module.exports = userModel;