const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const hallsSchemma = mongooseSchema({
  name: { type: String, required: true },
  numberOfStudents: { type: String, required: true }
});
const coursesSchemma = mongooseSchema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  numberOfStudents: { type: String, required: true }
});
const lecturersSchema = mongooseSchema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const scheduleSchema = mongooseSchema({
  session: { type: String, required: true },
  halls: [hallsSchemma],
  courses: [coursesSchemma],
  lecturers: [lecturersSchema],
  date: { type: Date, required: true }
});

module.exports = Schedule = mongoose.model("schedule", scheduleSchema);
