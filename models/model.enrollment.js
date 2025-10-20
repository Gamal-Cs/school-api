const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    course: {
        type: ObjectId,
        ref: 'Course'
    },
    enrollmentAt: Date
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = { Enrollment };
