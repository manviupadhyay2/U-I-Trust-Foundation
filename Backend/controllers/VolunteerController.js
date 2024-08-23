const { Volunteer, Student, Session } = require('../db/schema');

// Get list of students assigned to the volunteer
const listStudents = async (req, res) => {
    try {
        const volunteerId = req.user.id;
        const students = await Student.find({ assignedVolunteer: volunteerId });
        res.status(200).json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get individual student details
const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        res.status(200).json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get session history of the volunteer
const getSessionHistory = async (req, res) => {
    try {
        const volunteerId = req.user.id;
        const volunteer = await Volunteer.findById(volunteerId).populate('historySessions');
        res.status(200).json(volunteer.historySessions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get current sessions of the volunteer
const getCurrentSessions = async (req, res) => {
    try {
        const volunteerId = req.user.id;
        const volunteer = await Volunteer.findById(volunteerId).populate('upcomingSessions');
        res.status(200).json(volunteer.upcomingSessions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get expertise of the volunteer
const getVolunteerExpertise = async (req, res) => {
    try {
        const volunteerId = req.user.id;
        const volunteer = await Volunteer.findById(volunteerId);
        res.status(200).json(volunteer.expertise);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get volunteer details
const getVolunteerDetails = async (req, res) => {
    try {
        console.log(res.user);
        const volunteerId = req.user.id;
        const volunteer = await Volunteer.findById(volunteerId);
        res.status(200).json(volunteer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    listStudents,
    getStudentById,
    getSessionHistory,
    getCurrentSessions,
    getVolunteerExpertise,
    getVolunteerDetails
};
