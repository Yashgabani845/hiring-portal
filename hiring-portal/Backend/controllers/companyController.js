const User = require("../models/User");
const Company = require("../models/Company");



exports.postCompany=async (req, res) => {
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
        logo,
      } = req.body;
  
      if (!ownerEmail) {
        return res.status(400).json({ error: "Owner email is required" });
      }
  
      const user = await User.findOneAndUpdate(
        { email: ownerEmail },
        { role: "owner" },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
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
          twitter,
        },
        owner: ownerEmail,
      });
  
      const result = await newCompany.save();
      console.log("Company saved:", result);
  
      res
        .status(201)
        .json({ message: "Company registered successfully", company: result });
    } catch (error) {
      console.error("Error saving company:", error);
      res.status(500).json({ message: "Error registering company", error });
    }
  };

exports.getCompany=async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching companies", error });
    }
  };

  exports.getCompanies=async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ error: "Server error" });
    }
  };