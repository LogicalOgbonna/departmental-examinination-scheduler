const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const courseSchema = mongooseSchema({
  courses: [
    {
      code: { type: String },
      title: { type: String }
    }
  ]
});

module.exports = Courses = mongoose.model("course", courseSchema);
