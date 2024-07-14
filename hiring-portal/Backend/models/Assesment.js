const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [String], 
    correctAnswer: String 
  });
  
  const assessmentSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    results: [{
      applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: Number
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Assessment', assessmentSchema);
  