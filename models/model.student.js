const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
const Student = mongoose.model("Student", StudentSchema);
module.exports = { Student };
