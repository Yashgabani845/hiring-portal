const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['applied', 'shortlisted', 'interviewed', 'hired'], default: 'applied' },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  education: [{
    degree: { type: String, required: true },
    university: { type: String, required: true },
    cgpa: { type: Number, required: true }
  }],
  experience: [{
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true }
  }],

  skills: [String],
  assessmentResult: {
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
    score: Number
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
