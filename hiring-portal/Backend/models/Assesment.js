const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true }
}, { _id: false });

const codingQuestionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['coding'] },
  questionText: { type: String, required: true },
  constraints: [String],
  title: { type: String, required: true },
  problemDescription: { type: String, required: true },
  examples: [exampleSchema],
  testCases: [testCaseSchema], 
  codingSolution: String
}, { _id: false });

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['MCQ', 'text', 'coding'] },
  questionText: { type: String, required: true },
  options: [String],
  correctAnswer: String, 
  codingQuestion: codingQuestionSchema 
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  questions: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    marks: { type: Number, required: true }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  results: [{
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number,
    answers: [String]
  }],
  overallTime: { type: Number, required: true },
  maxMarks: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
