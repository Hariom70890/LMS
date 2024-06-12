const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;