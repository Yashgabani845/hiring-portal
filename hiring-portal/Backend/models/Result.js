const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true }, 
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  answers: [{
    code: String,
    results: [{
        input: String,
        expectedOutput: String,
        output: String,
        passed: Boolean,
        index: Number
    }]
}],
  feedback: String, 
  status: { 
    type: String, 
    enum: ['submitted', 'not submitted'],
    default: 'not submitted' 
  },
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Result', resultSchema);
