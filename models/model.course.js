const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  description: String,
  teacher: {
    type: ObjectId,
    ref: 'Teacher'
  },
  maxStudents: Number // duration in hours
});

const Course = mongoose.model('Course', courseSchema);
module.exports = {Course};