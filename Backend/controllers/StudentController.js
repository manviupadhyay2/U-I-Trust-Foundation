const {Student}=require('../db/schema');

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  const student = new Student({
    name: req.body.name,
    info: req.body.info,
    grade: req.body.grade,
    topicsLearnt: req.body.topicsLearnt,
    topicsToLearn: req.body.topicsToLearn,
    assessments: req.body.assessments,
    sessionsAttended: req.body.sessionsAttended,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (req.body.name) student.name = req.body.name;
    if (req.body.info) student.info = req.body.info;
    if (req.body.grade) student.grade = req.body.grade;
    if (req.body.topicsLearnt) student.topicsLearnt = req.body.topicsLearnt;
    if (req.body.topicsToLearn) student.topicsToLearn = req.body.topicsToLearn;
    if (req.body.assessments) student.assessments = req.body.assessments;
    if (req.body.sessionsAttended) student.sessionsAttended = req.body.sessionsAttended;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.remove();
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePretest = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const assessment = student.assessments.id(req.params.assessmentId);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });

    assessment.pretest = req.body.pretest;
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePosttest = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const assessment = student.assessments.id(req.params.assessmentId);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });

    assessment.posttest = req.body.posttest;
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  updatePretest,
  updatePosttest,
};
