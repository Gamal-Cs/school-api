const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    student: {
        type: ObjectId,
        ref: 'Student',
    },
    course: {
        type: ObjectId,
        ref: 'Course',
    },
    assignmentName: String,
    score: Number,
    maxScore: Number,
    givenBy: {
        type: ObjectId,
        ref: 'Techer',
    }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = { Grade };