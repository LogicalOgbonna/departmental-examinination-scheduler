const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const complaintSchema = mongooseSchema({
  message: { type: String, required: true },
  reason: { type: String, required: true },
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  userID: { type: String, required: true },
  conversation: [
    {
      message: { type: String },
      time: { type: Date, default: Date.now() },
      admin: { type: Boolean }
    }
  ]
});

module.exports = Complaints = mongoose.model("complaint", complaintSchema);
