const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [String], 
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['native', 'external'], required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  salaryRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  workLocation: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  employmentType: { type: String, enum: ['part-time', 'full-time'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
