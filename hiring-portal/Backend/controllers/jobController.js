const Job = require("../models/Job");
const User = require("../models/User");
const Company = require("../models/Company");





exports.searchJob=async (req, res) => {
  const { keywords, location } = req.query;

  try {
    const query = {};

    if (keywords) {
      query.$or = [
        { title: new RegExp(keywords, "i") },
        { description: new RegExp(keywords, "i") },
        { requirements: { $in: [new RegExp(keywords, "i")] } },
        { role: new RegExp(keywords, "i") },
        { department: new RegExp(keywords, "i") },
        { industry: new RegExp(keywords, "i") },
      ];
    }

    if (location) {
      query.workLocation = new RegExp(location, "i");
    }

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

//post jobs
exports.postJobs=async (req, res) => {
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
      experienceLevel,
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
      companyLogo,
    } = req.body;

    console.log("Received job data:", req.body);

    if (!ownerEmail) {
      return res.status(400).json({ error: "Owner email is required" });
    }

    if (!title || !description || !role) {
      return res
        .status(400)
        .json({ error: "Title, description, and role are required fields" });
    }

    if (applicationDeadline && isNaN(Date.parse(applicationDeadline))) {
      return res
        .status(400)
        .json({ error: "Invalid application deadline date" });
    }

    const company = await Company.findOne({ owner: ownerEmail });
    if (!company) {
      return res
        .status(404)
        .json({ error: "Company not found for the given owner email" });
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
      experienceLevel,
      remote,
      companyCulture,
      applicationDeadline: applicationDeadline
        ? new Date(applicationDeadline)
        : null,
      industry,
      keywords,
      contactEmail,
      companyWebsite,
      jobResponsibilities,
      languagesRequired,
    };

    if (link) {
      jobData.link = link;
    }

    if (companyLogo) {
      jobData.comlogo = companyLogo;
    }
    if (salaryRange) {
      jobData.salaryRange = {
        min: salaryRange.min,
        max: salaryRange.max,
      };
    }

    const job = new Job(jobData);
    await job.save();
    console.log("Job saved successfully");
    res.status(201).send(job);
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(400).send({ error: error.message });
  }
};

exports.getAllJob=async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllJobs=async (req, res) => {
  try {
    const email = req.query.email;
    console.log(email, "i fonud it");
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const comobj = await Company.find({ owner: email });
    const jobs = await Job.find({ postedBy: comobj });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getSingleJob=async (req, res) => {
  try {
    console.log("job called");
    // console.log(req);
    const job = await Job.findById(req.params.id);
    // console.log(job);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editJob=async (req, res) => {
  try {
    const jobId = req.params.id;
    const updateData = req.body;

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};