import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/ApplicationForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import Courses from "./course.json";
import countryData from "./country.json";
import collegesData from "./colleges.json";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [countryEmoji, setCountryEmoji] = useState("🇺🇸");

  const location = useLocation();
  const { jobId, emailcurrent } = location.state || {};
  console.log(emailcurrent);

  const [formData, setFormData] = useState({
    resume: "",
    coverLetter: "",
    mobileNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    instituteName: "",
    course: "",
    graduatingYear: "",
    courseDuration: "",
    countryOfResidence: "",
    cv: "",
    education: [{ degree: "", university: "", cgpa: "" }],
    experience: { company: "", role: "", duration: "" },
    skills: [""],
  });

  useEffect(() => {
    const codes = countryData.map(country => ({
      name: country.name,
      code: country.dial_code,
      emoji: country.emoji
    }));
    setCountryCodes(codes);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCountry = countryCodes.find(country => country.code === selectedCode);
    setSelectedCountryCode(selectedCode);
    setCountryEmoji(selectedCountry.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      ...formData,
      jobId,
      emailcurrent,
    };
    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        toast.success("Application submitted successfully!");
        navigate(`/`);
      } else {
        const errorData = await response.json();
        console.error("Error submitting application:", errorData);
        toast.error(`Failed to submit application: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application.");
    }
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>Apply for the Job</h2>
      
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
      </div>

      <div className="form-group">
        <div className="fgn">
          <div className="form-group-code">
            <label>Country Code:</label>
            <select name="countryCode" value={selectedCountryCode} onChange={handleCountryChange} required>
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.emoji} ({country.code})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group-number">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter your first name" required />
      </div>

      <div className="form-group">
        <label>Last Name (if applicable):</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" />
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
        <select name="instituteName" value={formData.college} onChange={handleInputChange} required>
          <option value="">Select College</option>
          {collegesData.map((college, index) => (
            <option key={index} value={college.college}>{college.college}</option>
          ))}
        </select> </div>

     

      <div className="form-group">
        <label>Course:</label>
        <select name="course" value={formData.course} onChange={handleInputChange} required>
          <option value="">Select Course</option>
          {Courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Graduating Year:</label>
        <input type="number" name="graduatingYear" value={formData.graduatingYear} onChange={handleInputChange} placeholder="Enter your graduating year" required />
      </div>

      <div className="form-group">
        <label>Course Duration:</label>
        <input type="text" name="courseDuration" value={formData.courseDuration} onChange={handleInputChange} placeholder="Enter course duration" required />
      </div>

      <div className="form-group">
        <label>Country of Residence:</label>
        <select name="countryOfResidence" value={formData.countryOfResidence} onChange={handleInputChange} required>
          <option value="">Select Country</option>
          {countryData.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>

 

      <div className="form-group">
        <label>Resume URL:</label>
        <input type="text" name="resume" value={formData.resume} onChange={handleInputChange} placeholder="Enter resume URL" required />
      </div>
      
      <div className="form-group">
        <label>CV URL (optional):</label>
        <input type="text" name="cv" value={formData.cv} onChange={handleInputChange} placeholder="Enter CV URL (optional)" />
      </div>
      
      <button type="submit" className="submit-btn">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;
