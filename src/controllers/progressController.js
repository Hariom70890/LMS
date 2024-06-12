const Progress = require('../models/Progress');

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.params.id }).populate('course', 'title');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUserProgress = async (req, res) => {
  try {
    const { courseId, completed } = req.body;
    const existingProgress = await Progress.findOne({ user: req.params.id, course: courseId });
    if (existingProgress) {
      existingProgress.completed = completed;
      await existingProgress.save();
      res.json(existingProgress);
    } else {
      const progress = new Progress({ user: req.params.id, course: courseId, completed });
      await progress.save();
      res.status(201).json(progress);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};