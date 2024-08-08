const mongoose = require('mongoose');

// Define the entire structure within the assessmentSchema
const assessmentSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // Optional
  questions: [{
    type: { type: String, enum: ['coding'] }, // Can add more types if needed
    questionText: { type: String },
    options: [String], // For non-coding questions, if any
    correctAnswer: String, // For non-coding questions, if any

    // Coding-specific fields
    codingQuestion: {
      title: { type: String },
      problemDescription: { type: String },
      constraints: [String],
      examples: [{
        input: String,
        output: String,
        explanation: String
      }],
      testCases: [{
        input: { type: String },
        output: { type: String }
      }],
      codingSolution: String
    }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Optional
  results: [{
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
    score: Number,
    answers: [String]
  }],
  overallTime: { type: Number },
  maxMarks: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Exporting the Assessment Model
module.exports = mongoose.model('Assessment', assessmentSchema);
