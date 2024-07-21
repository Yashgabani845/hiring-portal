const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  logo: { type: String },
  establishedYear: { type: Number },
  employeesCount: { type: Number },
  socialMediaLinks: {
    linkedin: { type: String },
    facebook: { type: String },
    twitter: { type: String }
  },
  owner: { type: String}
});

module.exports = mongoose.model('Company', companySchema);
