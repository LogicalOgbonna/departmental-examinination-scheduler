const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const courseSchema = mongooseSchema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  numberOfStudents: { type: Number, required: true }
  // lecturer: [
  //   {
  //     name: { type: String }
  //   }
  // ]
});

module.exports = Courses = mongoose.model("course", courseSchema);
