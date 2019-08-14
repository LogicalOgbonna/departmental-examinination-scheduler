const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const settingsSchema = mongooseSchema(
  {
    numberOfStudents: { type: String, required: true },
    numberOfLectures: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = Setting = mongoose.model("settings", settingsSchema);
