import React, { useState } from "react";
import axios from "axios";
import "../CSS/ApplicationForm.css";

const ApplicationForm = ({ jobId, applicantId }) => {
  const [formData, setFormData] = useState({
    resume: "",
    coverLetter: "",
    mobileNumber: "",
    email: "",
    education: [{ degree: "", university: "", cgpa: "" }],
    experience: [{ company: "", role: "", duration: "" }],
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

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperience = formData.experience.map((exp, expIndex) =>
      expIndex === index ? { ...exp, [name]: value } : exp
    );
    setFormData({ ...formData, experience: newExperience });
  };

  const addEducationField = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", university: "", cgpa: "" }],
    });
  };

  const addExperienceField = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", role: "", duration: "" }],
    });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
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
        <label>Resume URL:</label>
        <input type="text" name="resume" value={formData.resume} onChange={handleInputChange} required />
      </div>
      
      <div className="form-group">
        <label>Cover Letter:</label>
        <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>

      <div className="education-section">
        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="form-group">
            <label>Degree:</label>
            <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} required />

            <label>University:</label>
            <input type="text" name="university" value={edu.university} onChange={(e) => handleEducationChange(index, e)} required />

            <label>CGPA:</label>
            <input type="number" name="cgpa" value={edu.cgpa} onChange={(e) => handleEducationChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={addEducationField}>Add More Education</button>
      </div>

      <div className="experience-section">
        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="form-group">
            <label>Company:</label>
            <input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} required />

            <label>Role:</label>
            <input type="text" name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} required />

            <label>Duration:</label>
            <input type="text" name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={addExperienceField}>Add More Experience</button>
      </div>

      <div className="skills-section">
        <h3>Skills</h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="form-group">
            <label>Skill:</label>
            <input type="text" value={skill} onChange={(e) => {
              const newSkills = formData.skills.map((sk, skIndex) => skIndex === index ? e.target.value : sk);
              setFormData({ ...formData, skills: newSkills });
            }} />
          </div>
        ))}
        <button type="button" onClick={addSkill}>Add More Skills</button>
      </div>

      <button type="submit" className="submit-button">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;
