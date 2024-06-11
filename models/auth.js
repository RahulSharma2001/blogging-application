const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "CREATOR",
    enum: ["ADMIN", "CREATOR"],
  },
});

const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;
