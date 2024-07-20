const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const User = require('./models/User'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/users/signup', async (req, res) => {
  try {
    const { name, email, password, location, locationPreferences, expectedSalary, jobType, jobTitle, techStack, skills, experience, address, languages, degree, university, cgpa, pastJobs, pastJobDetails } = req.body;

    console.log("Received data", req.body);

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileDetails: {
        education: { degree, university, cgpa },
        experience: pastJobs,
        skills,
        address,
        languages,
        techStack
      },
      location,
      locationPreferences,
      expectedSalary,
      jobType,
      jobTitle
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});


app.post('/api/users/signin', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? '30d' : '1d' } 
    );

    res.json({ message: 'Sign in successful', token });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).json({ message: 'Error during sign in', error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
