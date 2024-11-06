const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        device: { type: String, required: true },
        email: { type: String, required: true },
        feedback: { type: String, required: true },
        name: { type: String, required: true },
        priority: { type: String, required: true },
        rating: { type: Number, required: true },
        subject: { type: String, required: true },
        suggestions: { type: String, required: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FeedbackForm", feedbackSchema);
