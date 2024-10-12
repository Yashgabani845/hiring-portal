const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    query: {
        type: String,
        required: true,
        trim: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,  // Automatically add a timestamp
    },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
