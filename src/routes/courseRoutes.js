const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', authMiddleware, roleMiddleware(['teacher']), courseController.createCourse);
router.put('/:id', authMiddleware, roleMiddleware(['teacher']), courseController.updateCourse);
router.delete('/:id', authMiddleware, roleMiddleware(['teacher']), courseController.deleteCourse);
router.get( '/search', courseController.searchCourses );

module.exports = router;