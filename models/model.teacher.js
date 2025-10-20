
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  subject: {
    type: String
  },
  phone: String
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = {Teacher};