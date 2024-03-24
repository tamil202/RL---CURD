const mongoose = require("mongoose");
// Define Schema
const userSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const otp = mongoose.model("otpstore", userSchema);

module.exports = otp;
