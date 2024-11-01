const bcrypt = require("bcrypt");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();


// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Set your email
    pass: process.env.EMAIL_PASS, // Set your email password or app password
  },
});

// Step 1: Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and expiration date
    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    user.otp = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    res.status(500).json({ message: "Error requesting password reset" });
  }
};
// Step 2: Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const user = await User.findOne({ email, otp });
      if (!user) {
        return res.status(400).json({ message: "Invalid OTP or email" });
      }
  
      if (user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({ message: "OTP has expired" });
      }
  
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      res.status(500).json({ message: "Error verifying OTP" });
    }
  };

  

// Step 3: Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP or email" });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};
