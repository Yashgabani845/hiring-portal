const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: { type: String },
  role: { type: String },
  duration: { type: String },
  details: { type: String },
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  university: { type: String, required: true },
  cgpa: { type: Number, required: true },
});

const profileDetailsSchema = new mongoose.Schema({
  bio: { type: String },
  avatar: { type: String },
  education: educationSchema,
  pastJobs: [jobSchema],
  skills: [String],
  address: { type: String },
  languages: [String],
  techStack: { type: String },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "owner", "admin"], default: "client" },
  profileDetails: profileDetailsSchema,
  location: { type: String },
  locationPreferences: { type: String },
  expectedSalary: { type: String },
  jobType: { type: String, enum: ["part-time", "full-time"] },
  jobTitle: { type: String },
  resume: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  otp: { type: String }, // Store the hashed OTP
  verified: { type: Boolean, default: false },
  otpExpiry: Date,   
});


module.exports = mongoose.models.User||mongoose.model("User", userSchema);
