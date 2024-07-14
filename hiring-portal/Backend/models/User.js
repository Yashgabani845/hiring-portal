const mongoose = require('mongoose');

const educationDetailsSchema = new mongoose.Schema({
  college: { type: String, required: function() { return this.experience === 0; } },
  degree: { type: String, required: function() { return this.experience === 0; } },
  fieldOfStudy: { type: String, required: function() { return this.experience === 0; } },
  graduationYear: { type: Number, required: function() { return this.experience === 0; } },
  cgpa: { type: Number, required: function() { return this.experience === 0; } }
});

const profileDetailsSchema = new mongoose.Schema({
  phoneNumber: String,
  address: String,
  experience: { type: Number, default: 0 },
  education: educationDetailsSchema,
  skills: [String],
  resume: String 
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'owner', 'admin'], required: true },
  profileDetails: profileDetailsSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
