const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const User = require('./models/User'); 
const Company = require('./models/Company');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/users/signup', async (req, res) => {
  try {
    const { name, email, password, location, locationPreferences, expectedSalary, jobType, jobTitle, techStack, skills, experience, address, languages, degree, university, cgpa, pastJobs, pastJobDetails } = req.body;

    console.log("Received data", req.body);

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
    console.log(user);
    if (!user) {
      console.warn(`Sign in failed: invalid email - ${email}`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`Sign in failed: incorrect password - ${email}`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? '30d' : '1d' }
    );
    
    res.json({ token, email: user.email });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).json({ message: 'Error during sign in', error });
  }
});


app.post('/api/jobs', async (req, res) => {
  console.log('Request Body:', req.body); 
  try {
      const {
          title,
          description,
          requirements,
          type,
          salaryRange,
          workLocation,
          role,
          department,
          employmentType,
          remote,
          benefits,
          companyCulture,
          applicationDeadline,
          experienceLevel,
          educationLevel,
          industry,
          keywords,
          contactEmail,
          companyWebsite,
          jobResponsibilities,
          languagesRequired,
          ownerEmail 
      } = req.body;

      if (!ownerEmail) {
          return res.status(400).json({ error: 'Owner email is required' });
      }

      const company = await Company.findOne({ owner: ownerEmail });
      if (!company) {
          return res.status(404).json({ error: 'Company not found for the given owner email' });
      }

      const job = new Job({
          title,
          description,
          requirements,
          postedBy: company._id,
          type,
          salaryRange: {
              min: salaryRange.min,
              max: salaryRange.max
          },
          workLocation,
          role,
          department,
          employmentType,
          remote,
          benefits,
          companyCulture,
          applicationDeadline: new Date(applicationDeadline), 
          experienceLevel,
          educationLevel,
          industry,
          keywords,
          contactEmail,
          companyWebsite,
          jobResponsibilities,
          languagesRequired
      });

      await job.save();
      res.status(201).send(job);
  } catch (error) {
      res.status(400).send({ error: error.message });
  }
});
app.post('/api/company',  async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const newCompany = new Company({
      name: req.body.name,
      description: req.body.description,
      industry: req.body.industry,
      location: req.body.location,
      website: req.body.website,
      email: req.body.email,
      phone: req.body.phone,
      logo: null, 
      establishedYear: req.body.establishedYear,
      employeesCount: req.body.employeesCount,
      socialMediaLinks: {
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
      }
    });

    const result = await newCompany.save();
    console.log('Company saved:', result);
    res.status(201).json({ message: 'Company registered successfully', company: result });
  } catch (error) {
    console.error('Error saving company:', error);
    res.status(500).json({ message: 'Error registering company', error });
  }
});
app.get('/api/users/profile', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
});

app.post('/api/company', async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const {
      name,
      description,
      industry,
      location,
      website,
      email,
      phone,
      establishedYear,
      employeesCount,
      linkedin,
      facebook,
      twitter,
      ownerEmail 
    } = req.body;

    if (!ownerEmail) {
      return res.status(400).json({ error: 'Owner email is required' });
    }

    const user = await User.findOneAndUpdate(
      { email: ownerEmail },
      { role: 'owner' },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newCompany = new Company({
      name,
      description,
      industry,
      location,
      website,
      email,
      phone,
      logo: null,
      establishedYear,
      employeesCount,
      socialMediaLinks: {
        linkedin,
        facebook,
        twitter
      },
      owner: ownerEmail 
    });

    const result = await newCompany.save();
    console.log('Company saved:', result);

    res.status(201).json({ message: 'Company registered successfully', company: result });

  } catch (error) {
    console.error('Error saving company:', error);
    res.status(500).json({ message: 'Error registering company', error });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
