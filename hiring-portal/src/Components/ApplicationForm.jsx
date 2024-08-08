import React, { useState } from "react";
import axios from "axios";
import "../CSS/ApplicationForm.css";

const ApplicationForm = ({ jobId, applicantId }) => {
  const [formData, setFormData] = useState({
    resume: "",
    coverLetter: "",
    mobileNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    instituteName: "",
    type: "",
    course: "",
    courseSpecialization: "",
    graduatingYear: "",
    courseDuration: "",
    countryOfResidence: "",
    cv: "",
    education: [{ degree: "", university: "", cgpa: "" }],
    experience: { company: "", role: "", duration: "" },
    skills: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = formData.education.map((edu, eduIndex) =>
      eduIndex === index ? { ...edu, [name]: value } : edu
    );
    setFormData({ ...formData, education: newEducation });
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, experience: { ...formData.experience, [name]: value } });
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, skills: [value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      ...formData,
      jobId,
      applicantId,
    };
    try {
      const response = await axios.post("http://localhost:5000/api/applications", applicationData);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>Apply for the Job</h2>
      
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Last Name (if applicable):</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Institute Name:</label>
        <input type="text" name="instituteName" value={formData.instituteName} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Type:</label>
        <input type="text" name="type" value={formData.type} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Course:</label>
        <input type="text" name="course" value={formData.course} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Course Specialization:</label>
        <input type="text" name="courseSpecialization" value={formData.courseSpecialization} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Graduating Year:</label>
        <input type="number" name="graduatingYear" value={formData.graduatingYear} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Course Duration:</label>
        <input type="text" name="courseDuration" value={formData.courseDuration} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Country of Residence:</label>
        <input type="text" name="countryOfResidence" value={formData.countryOfResidence} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Resume URL:</label>
        <input type="text" name="resume" value={formData.resume} onChange={handleInputChange} required />
      </div>
      
      <div className="form-group">
        <label>CV URL (optional):</label>
        <input type="text" name="cv" value={formData.cv} onChange={handleInputChange} />
      </div>
      <button type="submit" className="submit-btn">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;
