const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);
