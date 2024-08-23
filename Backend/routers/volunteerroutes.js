const express = require('express');
const {
    listStudents,
    getStudentById,
    getSessionHistory,
    getCurrentSessions,
    getVolunteerExpertise,
    getVolunteerDetails
} = require('../controllers/VolunteerController');
const { verifyToken } = require('../middlewares/AuthToken');
const router = express.Router();

router.get('/students', verifyToken, listStudents);
router.get('/students/:id', verifyToken, getStudentById);
router.get('/sessions/history', verifyToken, getSessionHistory);
router.get('/sessions/current', verifyToken, getCurrentSessions);
router.get('/expertise', verifyToken, getVolunteerExpertise);
router.get('/details', verifyToken, getVolunteerDetails);

module.exports = router;
