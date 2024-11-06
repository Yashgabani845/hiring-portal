const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/feedback", feedbackController.submitFeedback);

router.get("/feedback", feedbackController.getFeedback);

module.exports = router;
