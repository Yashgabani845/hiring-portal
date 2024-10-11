const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.signUp= async (req, res) => {
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
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
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
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user", error });
    }
  };

exports.signIn=async (req, res) => {
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

exports.getProfile=async (req, res) => {
    try {
      const { email } = req.query;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Error fetching user profile", error });
    }
  };
exports.getAllUsers=async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};


