
const Company = require("../models/Company");
const Assessment = require("../models/Assesment");
const Application = require("../models/Application");
const Result = require("../models/Result");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gabaniyash846@gmail.com",
      pass: "frtkmvbebchjfile",
    },
  });


exports.test=async (req, res) => {
    try {
      const { jobId, maxMarks, questions, owner, endTime, startTime } = req.body;
      console.log(owner);
      const company = await Company.findOne({ owner: owner });
      console.log(company);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      console.log(jobId, maxMarks, questions, owner);
  
      const newAssessment = new Assessment({
        jobId: jobId,
        createdBy: company._id,
        maxMarks,
        questions,
        startTime,
        endTime,
      });
  
      const savedAssessment = await newAssessment.save();
      console.log("assesment saved");
      res.status(201).json(savedAssessment);
    } catch (error) {
      console.error("Error creating assessment:", error);
      res.status(500).json({ message: "Failed to create assessment", error });
    }
  };


  exports.hire=async (req, res) => {
    const { applicantId, jobId } = req.body;
    try {
      console.log("Applicant ID:", applicantId, "Job ID:", jobId);
  
      // Find the assessment using jobId
      const ass = await Assessment.findById(jobId);
      console.log("Assessment:", ass);
  
      if (!ass) {
        return res.status(404).json({ message: "Assessment not found" });
      }
  
      const actualJobId = ass.jobId;
      console.log("Actual Job ID:", actualJobId);
  
      // Find the application using applicantId and actualJobId
      const application = await Application.findOne({
        applicantId,
        jobId: actualJobId,
      });
      console.log("Application:", application);
  
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      // Prepare email options
      const mailOptions = {
        from: "gabaniyash846@gmail.com",
        to: application.email,
        subject: "Congratulations! You are Hired",
        text: `Dear ${application.firstName},\n\nWe are pleased to inform you that you have been hired for the job associated with ID: ${jobId}.\n\nBest Regards,\nYour Company`,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      // Delete the application document if it exists
      if (application) {
        await Application.deleteOne({ _id: application._id });
      }
  
      // Delete the result document if it exists
      const result = await Result.findOne({ applicantId });
      if (result) {
        await Result.deleteOne({ applicantId });
      }
  
      res
        .status(200)
        .json({ message: "Applicant hired, email sent, and result deleted" });
    } catch (error) {
      console.error("Error:", error.message); // Log the error message
      res.status(500).json({ message: error.message });
    }
  };

  exports.reject=async (req, res) => {
    const { applicantId, jobId } = req.body;
  
    try {
      const application = await Application.findOne({ applicantId, jobId });
  
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      // Prepare email options
      const mailOptions = {
        from: "gabaniyash846@gmail.com",
        to: application.email,
        subject: "Application Status: Rejected",
        text: `Dear ${application.firstName},\n\nWe regret to inform you that your application for the job associated with ID: ${jobId} has been rejected.\n\nBest Regards,\nYour Company`,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
  
      // Delete the application document if it exists
      if (application) {
        await Application.deleteOne({ _id: application._id });
      }
  
      res.status(200).json({ message: "Applicant rejected and email sent" });
    } catch (error) {
      console.error("Error in rejecting application:", error.message);
      res.status(500).json({ message: error.message });
    }
  };

  exports.getResult= async (req, res) => {
    try {
      const assessmentId = req.params.assessmentId;
      console.log("i got asssesment", assessmentId);
      const results = await Result.find({ assessmentId: assessmentId }).populate(
        "applicantId",
        "name email"
      );
      console.log(results);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };