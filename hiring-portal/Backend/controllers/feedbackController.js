const FeedbackForm = require('../models/feedback.js')// Correct import without 'any'

// Handle POST request to submit feedback
exports.submitFeedback = async (req, res) => {
    try {
        const { Name, Email, Subject, Date, Device, Priority, Suggestions, Feedback, Rating } = req.body;

        const newFeedback = new FeedbackForm({
            date: Date,
            device: Device,
            email: Email,
            feedback: Feedback,
            name: Name,
            priority: Priority,
            rating: Rating,
            subject: Subject,
            suggestions: Suggestions,
        });

        await newFeedback.save();
        res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to submit feedback", error: error.message });
    }
};

// Handle GET request to retrieve all feedback
exports.getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json({ feedbacks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve feedback", error: error.message });
    }
};
