const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const hallSchema = mongooseSchema({
  name: { type: String, required: true },
  numberOfStudents: { type: Number, required: true }
});

module.exports = Halls = mongoose.model("hall", hallSchema);
