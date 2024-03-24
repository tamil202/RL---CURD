const mongoose = require("mongoose");

// Define Schema
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

const userData = mongoose.model("userDetails", userSchema);

module.exports = userData;
