const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const { exec } = require('child_process')
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const User = require('./models/User'); 
const Company = require('./models/Company');
const Assessment = require('./models/Assesment')
const Application = require('./models/Application');
const compilex = require('compilex');
const Result = require('./models/Result');

const http = require('http');

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
        isFresher 
      } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
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
          pastJobs: !isFresher && pastJobs.length > 0 ? pastJobs : undefined  
        },
        location,
        locationPreferences,
        expectedSalary,
        jobType,
        jobTitle,
        resume
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  });
  app.delete('/api/applications/:id', async (req, res) => {
    const applicationId = req.params.id;

    try {
        const deletedApplication = await Application.findByIdAndDelete(applicationId);

        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        console.log("appplication deleted")
        res.status(200).json({ message: 'Application deleted successfully' });
       
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/api/jobs/search', async (req, res) => {
  const { keywords, location } = req.query;

  try {
    const query = {};

    if (keywords) {
      query.$or = [
        { title: new RegExp(keywords, 'i') },
        { description: new RegExp(keywords, 'i') },
        { requirements: { $in: [new RegExp(keywords, 'i')] } },
        { role: new RegExp(keywords, 'i') },
        { department: new RegExp(keywords, 'i') },
        { industry: new RegExp(keywords, 'i') },
      ];
    }

    if (location) {
      query.workLocation = new RegExp(location, 'i');
    }

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
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
      companyCulture,
      applicationDeadline,
      industry,
      keywords,
      contactEmail,
      companyWebsite,
      jobResponsibilities,
      languagesRequired,
      ownerEmail,
      link,
      companyLogo
    } = req.body;

    console.log('Received job data:', req.body);

    if (!ownerEmail) {
      return res.status(400).json({ error: 'Owner email is required' });
    }

    if (!title || !description || !role) {
      return res.status(400).json({ error: 'Title, description, and role are required fields' });
    }



    if (applicationDeadline && isNaN(Date.parse(applicationDeadline))) {
      return res.status(400).json({ error: 'Invalid application deadline date' });
    }

    const company = await Company.findOne({ owner: ownerEmail });
    if (!company) {
      return res.status(404).json({ error: 'Company not found for the given owner email' });
    }

    const jobData = {
      title,
      description,
      requirements,
      postedBy: company._id,
      type,
      workLocation,
      role,
      department,
      employmentType,
      remote,
      companyCulture,
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
      industry,
      keywords,
      contactEmail,
      companyWebsite,
      jobResponsibilities,
      languagesRequired
    };

    if (link) {
      jobData.link = link;
    }

    if (companyLogo) {
      jobData.comlogo = companyLogo;
    }
    if(salaryRange){
     jobData.salaryRange={
        min: salaryRange.min,
        max: salaryRange.max
      }
    }

    const job = new Job(jobData);
    await job.save();
    console.log('Job saved successfully');
    res.status(201).send(job);

  } catch (error) {
    console.error('Error saving job:', error);
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
      ownerEmail,
      logo
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
      logo,
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
    
    const { jobId, maxMarks, questions, owner,endTime,startTime } = req.body;
    console.log(owner)
    const company = await Company.findOne({ owner: owner });
    console.log(company)
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    console.log(jobId,maxMarks,questions,owner)

    const newAssessment = new Assessment({
      jobId:jobId,
      createdBy: company._id, 
      maxMarks,
      questions,
      startTime,
      endTime
    });

    const savedAssessment = await newAssessment.save();
    console.log("assesment saved")
    res.status(201).json(savedAssessment);
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ message: 'Failed to create assessment', error });
  }
});
const nodemailer = require('nodemailer');

app.post('/api/applications', async (req, res) => {
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

    if (!resume || !mobileNumber || !email || !firstName || !gender || !instituteName || !course || !graduatingYear || !courseDuration || !countryOfResidence) {
      return res.status(400).json({ message: "Please fill all required fields." });
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
      service: 'gmail',  // Updated to use 'gmail' service instead of 'host'
      auth: {
        user: 'gabaniyash846@gmail.com',
        pass: 'frtkmvbebchjfile',
      },
    });

    const job = await Job.findById(jobId);
    const jobTitle = job.title;

    const mailOptions = {
      from: 'gabaniyash846@gmail.com',
      to: emailcurrent,
      subject: 'Job Application Confirmation',
      text: `Dear ${firstName} ${lastName},\n\nYour application for the job "${jobTitle}" has been successfully submitted.\n\nThank you for applying!\n\nBest regards,\nYour Company Name`,
    };

    // Send email and handle response accordingly
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Even though email fails, the application is already saved, so you might want to notify the client but still return success for the application submission
        return res.status(201).json({
          message: "Application submitted successfully, but failed to send confirmation email.",
          application: savedApplication,
          emailError: error.message,
        });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(201).json({
          message: "Application submitted successfully and confirmation email sent.",
          application: savedApplication,
        });
      }
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({ message: "Failed to submit application.", error });
  }
});
app.get('/api/company', async (req, res) => {
  try {
      const companies = await Company.find();
      res.status(200).json(companies);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching companies', error });
  }
});

app.get('/api/users', async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
});
app.get('/api/applications/:jobId', async (req, res) => {
  const { jobId } = req.params;

  try {
      const applications = await Application.find({ jobId }).populate('applicantId', 'name email profileDetails');

      if (!applications || applications.length === 0) {
          return res.status(404).json({ message: 'No applications found for this job' });
      }

      res.json(applications);
  } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/assessments/:jobId',async (req,res)=>{
  const { jobId } = req.params;
  try {
    const assessments = await Assessment.find({ jobId });

    if (assessments.length === 0) {
        return res.status(404).json({ message: 'No assessments found for this job' });
    }

    res.status(200).json(assessments);
} catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
}

})
app.get('/api/assessmen/:id', async (req, res) => {
  try {
      const assessment = await Assessment.findById(req.params.id);
      console.log(assessment)
      if (!assessment) {
          return res.status(404).json({ message: 'Assessment not found' });
      }
      res.json(assessment);
  } catch (error) {
      res.status(500).json({ message: 'Server Error' });
  }
});
app.use(bodyParser.json());
const options = { stats: true }; 
compilex.init(options);

app.post('/compile', async (req, res) => {
    const { question, language, code, testcases, email, assessmentId } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    let envData = { OS: 'windows', options: { timeout: 10000 } };
    let results = [];

    let result = await Result.findOne({ applicantId: user._id, assessmentId: assessmentId });
    if (!result) {
        result = new Result({
            assessmentId: assessmentId,
            applicantId: user._id,
            score: 0,
            answers: [],
            feedback: '',
            status: 'not submitted'
        });
    }

    const executeTestCase = async (index) => {
      if (index >= testcases.length) {
        result.answers.push({code , results})
          await result.save();
          return res.json(results.slice(0, 2));
      }
  
      const { input, output } = testcases[index];
      let compileFunc;
  
      switch (language) {
          case 'cpp':
              envData.cmd = 'g++';
              compileFunc = compilex.compileCPPWithInput;
              break;
          case 'java':
              compileFunc = compilex.compileJavaWithInput;
              break;
          case 'python':
              compileFunc = compilex.compilePythonWithInput;
              break;
          default:

            result.answers.push({code , results})

              await result.save();
              return res.json({ error: 'Language not supported' });
      }
  
      compileFunc(envData, code, input, async (data) => {
          if (data.error) {
              results.push({
                  input,
                  expectedOutput: output,
                  output: data.error,
                  passed: false,
                  index
              });
              failed = true;
              result.answers.push({code , results})

              await result.save();
              return res.json({
                  input,
                  expectedOutput: output,
                  output: data.error,
                  passed: false,
                  index
              });
          } else {
              const passed = data.output.trim() == output.trim();
              results.push({
                  input,
                  expectedOutput: output,
                  output: data.output,
                  passed,
                  index
              });
  
              if (!passed) {
                  failed = true;
                  result.answers.push({code , results})

                  await result.save();
                  return res.json({
                      input,
                      expectedOutput: output,
                      output: data.output,
                      passed: false,
                      index
                  });
              }
          }
  
          executeTestCase(index + 1); 
      });
  };
  
  executeTestCase(0);
  
});

app.post('/endtest', async (req, res) => {
  const { email, assessmentId } = req.body;
  const user = await User.findOne({ email: email });
  
  if (!user) {
      return res.status(404).json({ error: 'User not found' });
  }

  const result = await Result.findOne({ applicantId: user._id, assessmentId: assessmentId });
  if (!result) {
      return res.status(404).json({ error: 'Result not found' });
  }

  result.status = 'submitted';
  result.save()
      .then(() => res.json({ message: 'Test ended and result submitted' }))
      .catch((error) => res.status(500).json({ error: 'Error updating result' }));
});
app.get('/result/:email/:assessmentId', async (req, res) => {
  const { email, assessmentId } = req.params;

  try {
      const user = await User.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      const result = await Result.findOne({ applicantId: user._id, assessmentId: assessmentId });
if(result && result.status==="submitted"){
  res.json(result || { submitted: true, answers: [] });
}else{
      res.json( { submitted: false, answers: [] });}
  } catch (error) {
      console.error('Error in result endpoint:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gabaniyash846@gmail.com',
    pass: 'frtkmvbebchjfile',
  },
});
app.post('/api/hire', async (req, res) => {
  const { applicantId, jobId } = req.body;
  try {
    console.log('Applicant ID:', applicantId, 'Job ID:', jobId);
   
    // Find the assessment using jobId
    const ass = await Assessment.findById(jobId);
    console.log('Assessment:', ass);

    if (!ass) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    const actualJobId = ass.jobId;
    console.log('Actual Job ID:', actualJobId);

    // Find the application using applicantId and actualJobId
    const application = await Application.findOne({ applicantId, jobId: actualJobId });
    console.log('Application:', application);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Prepare email options
    const mailOptions = {
      from: 'gabaniyash846@gmail.com',
      to: application.email,
      subject: 'Congratulations! You are Hired',
      text: `Dear ${application.firstName},\n\nWe are pleased to inform you that you have been hired for the job associated with ID: ${jobId}.\n\nBest Regards,\nYour Company`
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

    res.status(200).json({ message: 'Applicant hired, email sent, and result deleted' });
  } catch (error) {
    console.error('Error:', error.message); // Log the error message
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/reject', async (req, res) => {
  const { applicantId, jobId } = req.body;

  try {
    const application = await Application.findOne({ applicantId, jobId });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Prepare email options
    const mailOptions = {
      from: 'gabaniyash846@gmail.com',
      to: application.email,
      subject: 'Application Status: Rejected',
      text: `Dear ${application.firstName},\n\nWe regret to inform you that your application for the job associated with ID: ${jobId} has been rejected.\n\nBest Regards,\nYour Company`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Delete the application document if it exists
    if (application) {
      await Application.deleteOne({ _id: application._id });
    }

    res.status(200).json({ message: 'Applicant rejected and email sent' });
  } catch (error) {
    console.error('Error in rejecting application:', error.message);
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/assessments/send', async (req, res) => {
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
      console.log('Email:', email);
      console.log('Job Title:', jobTitle);
      console.log('Start Time:', startTime);
      console.log('End Time:', endTime);
      console.log('Assessment Link:', assessmentLink);
      const mailOptions = {
        from: 'gabaniyash846@gmail.com',
        to: email,
        subject: `Assessment for ${jobTitle} - ${startTime} to ${endTime}`,
        text: `Dear Applicant,\n\nYou have an assessment scheduled for the job "${jobTitle}" from ${startTime} to ${endTime}.\n\nPlease complete the assessment using the following link: ${assessmentLink}\n\nBest regards,\nYour Company Name`,
      };
   


      await transporter.sendMail(mailOptions);
    }
    console.log("sended email")
    res.status(200).json({ message: 'Assessment emails sent successfully.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
});
app.get('/api/applicationss/:applicantId', async (req, res) => {
  try {
    const { applicantId } = req.params;
    console.log(applicantId)
    const applications = await Application.find({ applicantId }).populate('jobId').exec();
    console.log(applications)
    if (applications && applications.length > 0) {
      res.status(200).json(applications);
    } else {
      res.status(200).json([]);

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/results/:assessmentId', async (req, res) => {
  try {
    const assessmentId = req.params.assessmentId;
    console.log("i got asssesment",assessmentId)
    const results = await Result.find({ assessmentId: assessmentId }).populate('applicantId', 'name email'); 
    console.log(results)
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});