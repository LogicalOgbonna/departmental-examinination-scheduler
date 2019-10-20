const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const adminSchema = mongooseSchema(
  {
    email: { type: String, required: true },
    admin: { type: Boolean, default: false },
    password: { type: String, required: true },
    avatar: {type: String}
  },
  { timestamps: true }
);

module.exports = Admin = mongoose.model("admin", adminSchema);
