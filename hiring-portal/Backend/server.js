const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const User = require('./models/User'); 
const Company = require('./models/Company');
const Assessment = require('./models/Assesment')
const http = require('http');
const socketIo = require('socket.io');
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
          industry,
          keywords,
          contactEmail,
          companyWebsite,
          jobResponsibilities,
          languagesRequired
      });

      await job.save();
      console.log('data saved')
      res.status(201).send(job);
  } catch (error) {
      res.status(400).send({ error: error.message });
  } 
});
app.get('/api/job',async (req,res)=>{
 try{ const jobs= await Job.find();
  res.status(200).json(jobs);
} catch (error) {
    res.status(400).json({ error: error.message });
}
})
app.get('/api/jobs', async (req, res) => {
  try {
      const email = req.query.email; 
      console.log(email,"i fonud it")
      if (!email) {
          return res.status(400).json({ error: 'Email is required' });
      }
      
      const user = await User.findOne({ email:email });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const comobj = await Company.find({ owner:email });
      const jobs= await Job.find({ postedBy:comobj });
      res.status(200).json(jobs);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});
app.get('/api/jobs/:id', async (req, res) => {
  try {
    console.log("job called")
    console.log(req)
      const job = await Job.findById(req.params.id);
      console.log(job)
      if (!job) {
          return res.status(404).json({ error: 'Job not found' });
      }
      res.status(200).json(job);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
app.get('/api/companies/:id', async (req, res) => {
  try {
      const company = await Company.findById(req.params.id);
      if (!company) {
          return res.status(404).json({ error: 'Company not found' });
      }
      res.json(company);
  } catch (error) {
      console.error('Error fetching company:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const updateData = req.body;

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
app.post('/api/test', async (req, res) => {
  try {
    const { jobId, overallTime, maxMarks, questions, ownerEmail } = req.body;
console.log(jobId,overallTime,maxMarks,questions,ownerEmail)
    // Find the company based on ownerEmail
    const company = await Company.findOne({ owner: ownerEmail });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const newAssessment = new Assessment({
      jobId:jobId,
      createdBy: company._id, 
      overallTime,
      maxMarks,
      questions
    });

    const savedAssessment = await newAssessment.save();

    res.status(201).json(savedAssessment);
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ message: 'Failed to create assessment', error });
  }
});


const io = require('socket.io')(5001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const users = new Set();

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join', (data) => {
    const { userName, roomId } = data;
    users.add({ id: socket.id, userName, roomId });
    socket.join(roomId);
    io.to(roomId).emit('user-joined', { userName });
    io.to(roomId).emit('update-user-list', Array.from(users).filter(user => user.roomId === roomId).map(user => user.userName));
  });

  socket.on('disconnect', () => {
    const user = Array.from(users).find(user => user.id === socket.id);
    if (user) {
      users.delete(user);
      io.to(user.roomId).emit('user-left', { userName: user.userName });
      io.to(user.roomId).emit('update-user-list', Array.from(users).filter(u => u.roomId === user.roomId).map(u => u.userName));
    }
  });

  socket.on('candidate', (data) => {
    const { candidate, roomId } = data;
    socket.broadcast.to(roomId).emit('candidate', data);
  });

  socket.on('offer', (data) => {
    const { offer, roomId } = data;
    socket.broadcast.to(roomId).emit('offer', data);
  });

  socket.on('answer', (data) => {
    const { answer, roomId } = data;
    socket.broadcast.to(roomId).emit('answer', data);
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





