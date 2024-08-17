const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, 
  questions: [{
    type: { type: String, enum: ['coding'] }, 
    questionText: { type: String },
    options: [String], 
    correctAnswer: String, 
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
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, 
  maxMarks: { type: Number },
  startTime: { type: Date, required: true }, 
  endTime: { type: Date, required: true },  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
