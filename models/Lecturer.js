const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const lecturerSchema = mongooseSchema({
  name: { type: String, required: true },
  courses: [
    {
      code: { type: String },
      title: { type: String },
      numberOfStudents: { type: Number }
    }
  ]
});

module.exports = Lecturer = mongoose.model("lecturer", lecturerSchema);
