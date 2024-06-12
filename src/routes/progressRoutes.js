const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id/progress', authMiddleware, progressController.getUserProgress);
router.post('/:id/progress', authMiddleware, progressController.updateUserProgress);

module.exports = router;