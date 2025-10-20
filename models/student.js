const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.types.ObjectId,
    ref: "Student",
    // required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  documents: {
    type: [String],
    // required: true,
  },
});
const Student = mongoose.model(Student, StudentSchema);
module.exports = Student;
