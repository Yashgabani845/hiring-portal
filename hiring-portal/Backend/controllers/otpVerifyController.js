const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(otp, user.otp);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
   
      user.verified = true;
      user.otp = undefined; 
      await user.save();
  
      res.status(200).json({ message: "OTP verified successfully, account activated!" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Error verifying OTP", error });
    }
  };
  