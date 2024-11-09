const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");
const nodemailer = require('nodemailer');




exports.deleteApplication= async (req, res) => {
    const applicationId = req.params.id;z
  
    try {
      const deletedApplication = await Application.findByIdAndDelete(
        applicationId
      );
  
      if (!deletedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }
      console.log("appplication deleted");
      res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.postApplication=async (req, res) => {
    console.log("Got request");
  
    try {
      const {
        resume,
        cv,
        mobileNumber,
        email,
        firstName,
        lastName,
        gender,
        instituteName,
        course,
        graduatingYear,
        courseDuration,
        countryOfResidence,
        education,
        experience,
        skills,
        jobId,
        emailcurrent,
      } = req.body;
  
      if (
        !resume ||
        !mobileNumber ||
        !email ||
        !firstName ||
        !gender ||
        !instituteName ||
        !course ||
        !graduatingYear ||
        !courseDuration ||
        !countryOfResidence
      ) {
        return res
          .status(400)
          .json({ message: "Please fill all required fields." });
      }
  
      console.log(emailcurrent);
      const applicant = await User.findOne({ email: emailcurrent });
  
      if (!applicant) {
        return res.status(404).json({ message: "Applicant not found." });
      }
  
      const applicantId = applicant._id;
  
      const newApplication = new Application({
        resume,
        cv,
        mobileNumber,
        email,
        firstName,
        lastName,
        gender,
        instituteName,
        course,
        graduatingYear,
        courseDuration,
        countryOfResidence,
        education,
        experience,
        skills,
        jobId,
        applicantId,
      });
  
      const savedApplication = await newApplication.save();
  
      // Setup email transport
      const transporter = nodemailer.createTransport({
        service: "gmail", // Updated to use 'gmail' service instead of 'host'
        auth: {
          user: "gabaniyash846@gmail.com",
          pass: "frtkmvbebchjfile",
        },
      });
  
      const job = await Job.findById(jobId);
      const jobTitle = job.title;
  
      const mailOptions = {
        from: "gabaniyash846@gmail.com",
        to: emailcurrent,
        subject: "Job Application Confirmation",
        text: `Dear ${firstName} ${lastName},\n\nYour application for the job "${jobTitle}" has been successfully submitted.\n\nThank you for applying!\n\nBest regards,\nYour Company Name`,
      };
  
      // Send email and handle response accordingly
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          // Even though email fails, the application is already saved, so you might want to notify the client but still return success for the application submission
          return res.status(201).json({
            message:
              "Application submitted successfully, but failed to send confirmation email.",
            application: savedApplication,
            emailError: error.message,
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(201).json({
            message:
              "Application submitted successfully and confirmation email sent.",
            application: savedApplication,
          });
        }
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      return res
        .status(500)
        .json({ message: "Failed to submit application.", error });
    }
  };

exports.getSingleApplication=async (req, res) => {
    const { jobId } = req.params;
  
    try {
      const applications = await Application.find({ jobId }).populate(
        "applicantId",
        "name email profileDetails"
      );
  
      if (!applications || applications.length === 0) {
        return res
          .status(404)
          .json({ message: "No applications found for this job" });
      }
  
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.getApplicant=async (req, res) => {
    try {
      const { applicantId } = req.params;
      console.log(applicantId);
      const applications = await Application.find({ applicantId })
        .populate("jobId")
        .exec();
      console.log(applications);
      if (applications && applications.length > 0) {
        res.status(200).json(applications);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
  