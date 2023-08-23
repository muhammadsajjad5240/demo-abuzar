const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "user" }
);

const user = mongoose.model("user", User);

module.exports = user;
