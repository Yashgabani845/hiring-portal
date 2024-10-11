
const Job = require("../models/Job");
const Assessment = require("../models/Assesment");
const Application = require("../models/Application");

exports.getAssessment=async (req, res) => {
    const { jobId } = req.params;
    try {
      const assessments = await Assessment.find({ jobId });
  
      if (assessments.length === 0) {
        return res
          .status(404)
          .json({ message: "No assessments found for this job" });
      }
  
      res.status(200).json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  exports.getSingleAssessment=async (req, res) => {
    try {
      const assessment = await Assessment.findById(req.params.id);
      console.log(assessment);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

  exports.postAssessment=async (req, res) => {
    const { jobId, assessmentId } = req.body;
  
    try {
      const job = await Job.findById(jobId);
      const assessment = await Assessment.findById(assessmentId);
      const applications = await Application.find({ jobId });
  
      const jobTitle = job.title;
      const startTime = new Date(assessment.startTime).toLocaleString();
      const endTime = new Date(assessment.endTime).toLocaleString();
      const assessmentLink = `http://localhost:3000/code/${assessmentId}`;
  
      for (const application of applications) {
        const email = application.email;
        console.log("Email:", email);
        console.log("Job Title:", jobTitle);
        console.log("Start Time:", startTime);
        console.log("End Time:", endTime);
        console.log("Assessment Link:", assessmentLink);
        const mailOptions = {
          from: "gabaniyash846@gmail.com",
          to: email,
          subject: `Assessment for ${jobTitle} - ${startTime} to ${endTime}`,
          text: `Dear Applicant,\n\nYou have an assessment scheduled for the job "${jobTitle}" from ${startTime} to ${endTime}.\n\nPlease complete the assessment using the following link: ${assessmentLink}\n\nBest regards,\nYour Company Name`,
        };
  
        await transporter.sendMail(mailOptions);
      }
      console.log("sended email");
      res.status(200).json({ message: "Assessment emails sent successfully." });
    } catch (error) {
      console.error("Error sending emails:", error);
      res
        .status(500)
        .json({ message: "Error sending emails", error: error.message });
    }
  };


exports.getAsses=async (req, res) => {
    try {
      const assessment = await Assessment.findById(req.params.id);
      console.log(assessment);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };