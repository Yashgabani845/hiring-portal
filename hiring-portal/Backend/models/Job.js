  const mongoose = require('mongoose');

  const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String], 
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    type: { type: String, enum: ['native', 'external'], required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    salaryRange: {
      min: { type: Number },
      max: { type: Number }
    },
    workLocation: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    employmentType: { type: String, enum: ['part-time', 'full-time'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    remote: { type: Boolean, default: false },
    companyCulture: { type: String },
    applicationDeadline: { type: Date }, 
    industry: { type: String }, 
    keywords: [String],
    contactEmail: { type: String, required: true }, 
    companyWebsite: { type: String }, 
    jobResponsibilities: [String], 
    languagesRequired: [String],
    link:{ type: String},
    comlogo: {type: String}
  });

  module.exports = mongoose.model('Job', jobSchema);
