const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const userSchema = mongooseSchema(
  {
    email: { type: String, required: true },
    admin: { type: Boolean, default: false },
    password: { type: String, required: true },
    timeTable: [{ type: Array }]
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", userSchema);
