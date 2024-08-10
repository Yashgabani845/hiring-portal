const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  resume: { type: String, required: true },
  coverLetter: { type: String },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  instituteName: { type: String, required: true },
  graduatingYear: { type: Number, required: true },
  courseDuration: { type: String, required: true },
  countryOfResidence: { type: String, required: true },
  cv: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;