const Course = require('../models/Course');
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

mongoose.plugin(paginate);

exports.getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const courses = await Course.paginate(
      {},
      { page, limit, populate: 'teacher', sort: { createdAt: -1 } }
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// src/controllers/courseController.js
exports.createCourse = async (req, res) => {
  try {
    const { title, description, lessons } = req.body;
    const teacher = req.user._id;
    const course = new Course({ title, description, teacher, lessons });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, lessons } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    course.title = title;
    course.description = description;
    course.lessons = lessons;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// searching
exports.searchCourses = async (req, res) => {
  try {
    const { title, description } = req.query;
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (description) {
      query.description = { $regex: description, $options: 'i' };
    }
    const courses = await Course.find(query).populate('teacher', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};