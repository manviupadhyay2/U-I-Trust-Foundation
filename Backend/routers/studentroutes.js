const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.patch('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.patch('/:id/assessments/:assessmentId/pretest', studentController.updatePretest);
router.patch('/:id/assessments/:assessmentId/posttest', studentController.updatePosttest);

module.exports = router;
