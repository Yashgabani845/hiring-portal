const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require('crypto');

exports.signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      location,
      locationPreferences,
      expectedSalary,
      resume,
      jobType,
      jobTitle,
      techStack,
      skills,
      address,
      degree,
      university,
      cgpa,
      experience,
      pastJobs,
      isFresher,
    } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const hashedOtp = await bcrypt.hash(otp, 10); // Hash the OTP for storage

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER ,
      to: email,
      subject: 'Your OTP Code from hiring-portal',
      text: `Your OTP code for verification is: ${otp}`,
    };

    // Send OTP email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP', error });
      }

      // Create the user without activating it yet
      const newUser = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        otp: hashedOtp, // Save the hashed OTP
        profileDetails: {
          education: !isFresher ? { degree, university, cgpa } : undefined,
          skills,
          address,
          techStack,
          pastJobs: !isFresher && pastJobs.length > 0 ? pastJobs : undefined,
        },
        location,
        locationPreferences,
        expectedSalary,
        jobType,
        jobTitle,
        resume,
        verified: false, // Initially set to false
      });

      await newUser.save();

      res.status(201).json({ message: "User created successfully, please verify your email" });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
exports.signIn = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      console.warn(`Sign in failed: invalid email - ${email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`Sign in failed: incorrect password - ${email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "1d" }
    );

    res.json({ token, email: user.email });
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Error during sign in", error });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};


exports.editProfile = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) return res.status(404).json({ message: "User not found" });
    const {
      name,
      location,
      locationPreferences,
      expectedSalary,
      resume,
      jobType,
      jobTitle,
      techStack,
      skills,
      address,
      degree,
      university,
      cgpa,
      experience,
      pastJobs,
      isFresher,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    user.name = name || user.name;
    user.location = location || user.location;
    user.locationPreferences = locationPreferences || user.locationPreferences;
    user.expectedSalary = expectedSalary || user.expectedSalary;
    user.resume = resume || user.resume;
    user.jobType = jobType || user.jobType;
    user.jobTitle = jobTitle || user.jobTitle;
    user.techStack = techStack || user.techStack;
    user.skills = skills || user.skills;
    user.address = address || user.address;

    if (!isFresher) {
      user.profileDetails.education = {
        degree: degree || user.profileDetails.education?.degree,
        university: university || user.profileDetails.education?.university,
        cgpa: cgpa || user.profileDetails.education?.cgpa,
      };

      // If pastJobs are provided, replace the current pastJobs array
      if (pastJobs && pastJobs.length > 0) {
        user.profileDetails.pastJobs = pastJobs.map((job) => ({
          company: job.company || "",
          role: job.role || "",
          duration: job.duration || "",
          details: job.details || "",
        }));
      }
    } else {
      // If the user is a fresher, remove past job details
      user.profileDetails.pastJobs = [];
      user.profileDetails.education = undefined;
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile", error });
  }
};

exports.addLanguages = async (req, res) => {
  try {
    const { email } = req.params;
    const { languages } = req.body;
    console.log(email);
    console.log(languages);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.profileDetails) {
      user.profileDetails = {};
    }

    console.log("first", languages);

    user.profileDetails.languages =
      languages || user.profileDetails.languages || [];

    await user.save();

    res.status(200).json({ message: "Languages updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

exports.sendResetEmail = async (req, res) => {
  try {
    const { UserEmail } = req.body;
    const user = await User.findOne({ email: UserEmail });

    if (!user) {
      return res.status(404).json({ message: "No such user found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "taskmaster991@gmail.com",
        pass: "kmepakzcabvztekd",
      },
    });

    const mailOptions = {
      from: "taskmaster991@gmail.com",
      to: UserEmail,
      subject: "Reset password",
      html: `
        <p>Reset your password from the link below.</p>
        <a href="your hosted site address/ForgotPassword/${UserEmail}">
          <button>Click here</button>
        </a> to reset password
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent: ", info.response);
        return res
          .status(200)
          .json({ message: "Password reset email sent", user });
      }
    });
  } catch (error) {
    console.error("Error during email sending:", error);
    res.status(500).json({ message: "Error sending reset email", error });
  }
};

exports.directResetPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { NewPassword } = req.body;

    const hashedPassword = await bcrypt.hash(NewPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    ).select("-photo");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password reset successful",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password", error });
  }
};

exports.directResetPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { NewPassword } = req.body;

    const hashedPassword = await bcrypt.hash(NewPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    ).select("-photo");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password reset successful",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password", error });
  }
};

//api to save user image
exports.EditImage = async (req, resp) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return resp.status(400).json({ message: "No image file provided" });
    }

    user.image.data = req.file.buffer;
    user.image.contentType = req.file.mimetype;

    await user.save();

    return resp
      .status(200)
      .json({ message: "Profile image updated successfully" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Server error", error });
  }
};
exports.Addskill = async (req, resp) => {
  try {
    const { email, skill } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { $addToSet: { "profileDetails.skills": skill } }, // Target the nested skills field
      { new: true } // Return the updated document
    );

    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }

    return resp.status(200).json({ message: "Skill added successfully", user });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "An error occurred", error });
  }
};
