const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['MCQ', 'text', 'coding'] },
  questionText: { type: String, required: true },
  options: [String], 
  correctAnswer: String,
  codingSolution: String 
});

const assessmentSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  results: [{
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number,
    answers: [String] 
  }],
  overallTime: { type: Number, required: true }, 
  marksPerQuestion: [{ 
    questionId: mongoose.Schema.Types.ObjectId,
    marks: Number 
  }],
  maxMarks: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
