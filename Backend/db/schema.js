const mongoose = require('mongoose');
const { Schema } = mongoose;

// Auth Schema
const authSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

// LCL Schema
const lclSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  volunteers: [{ type: Schema.Types.ObjectId, ref: 'Volunteer' }],
  center: { type: String }
});

// LCH Schema
const lchSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  lcls: [{ type: Schema.Types.ObjectId, ref: 'LCL' }],
  center: { type: String }
});

// Academics Schema
const academicsSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  subjects: [{
    name: { type: String, required: true },
    grade: { type: String, required: true }
  }],
  GPA: { type: Number, required: true },
  awards: [{
    title: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
});

// Volunteer Schema
const volunteerSchema = new Schema({
  name: { type: String, required: true },
  mob: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'lcl', 'cl', 'fellow'], required: true },
  expertise: [{ type: String, required: true }],
  historySessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  upcomingSessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }]
});

// Assessment Schema
const assessmentSchema = new Schema({
  topic: { type: String, required: true },
  pretest: { type: Number, required: true },
  posttest: { type: Number, required: true }
});

// Session Schema
const sessionSchema = new Schema({
  topic: { type: String, required: true },
  date: { type: Date, default: Date.now },
  volunteer: { type: Schema.Types.ObjectId, ref: 'Volunteer' },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  feedback: { type: String }
});

// Student Schema
const studentSchema = new Schema({
  name: { type: String, required: true },
  info: { type: String },
  grade: { type: String, required: true },
  topicsLearnt: [{ type: String }],
  topicsToLearn: [{ type: String }],
  currentTopic: { type: String },
  assessments: [assessmentSchema],
  sessionsAttended: { type: Number, default: 0 },
  sessionHistory: [{
    topic: { type: String, required: true },
    date: { type: Date, default: Date.now },
    volunteer: { type: Schema.Types.ObjectId, ref: 'Volunteer' },
    feedback: { type: String }
  }],
  lang: { type: String, required: true }
});

// Models
const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const Student = mongoose.model('Student', studentSchema);
const Session = mongoose.model('Session', sessionSchema);
const Academics = mongoose.model('Academics', academicsSchema);
const Auth = mongoose.model('Auth', authSchema);
const LCL = mongoose.model('LCL', lclSchema);
const LCH = mongoose.model('LCH', lchSchema);

module.exports = {
  Student,
  Session,
  Academics,
  Auth,
  Volunteer,
  LCL,
  LCH
};
