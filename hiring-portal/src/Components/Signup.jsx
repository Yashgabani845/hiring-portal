import React, { useState } from "react";
import Select from 'react-select';
import "../CSS/signup.css";
import axios from 'axios';
import skillsOptions from '../Json/skills.json';
import jobOptions from '../Json/upJobs.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/firebase';
import Navbar from "./Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isFresher, setIsFresher] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    locationPreferences: "",
    expectedSalary: "",
    jobType: "",
    jobTitle: "",
    techStack: "",
    skills: [],
    experience: "",
    resume: null,
    address: "",
    degree: "",
    university: "",
    cgpa: "",
    pastJobs: [{ company: "", role: "", duration: "", details: "" }] // Initialize with one job entry
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "resume" && files[0]) {
      const file = files[0];
      const storageRef = ref(storage, `resume/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prevData) => ({
              ...prevData,
              resume: downloadURL,
            }));
          });
        }
      );
    } else if (type === "checkbox") {
      setIsFresher(checked);
      setFormData({
        ...formData,
        degree: "",
        university: "",
        cgpa: "",
        pastJobs: [{ company: "", role: "", duration: "", details: "" }] // Reset past jobs if fresher
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData({
      ...formData,
      skills: selectedOptions.map(option => option.value)
    });
  };

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedJobs = [...formData.pastJobs];
    updatedJobs[index][name] = value;
    setFormData({
      ...formData,
      pastJobs: updatedJobs
    });
  };

  const addJob = () => {
    setFormData({
      ...formData,
      pastJobs: [...formData.pastJobs, { company: "", role: "", duration: "", details: "" }]
    });
  };

  const validateFields = () => {
    const requiredFields = {
      1: ["name", "email", "password", "techStack", "skills", "resume", "address"],
      2: ["expectedSalary", "jobType", "jobTitle"],
      3: ["location", "locationPreferences"],
      4: isFresher ? ["degree", "university", "cgpa"] : ["degree", "university", "cgpa", "pastJobs"]
    };

    const missingFields = requiredFields[step].filter(field => {
      if (field === "skills") {
        return formData.skills.length === 0;
      }
      if (field === "pastJobs") {
        return formData.pastJobs.some(job => !job.company || !job.role || !job.duration || !job.details);
      }
      return !formData[field];
    });

    if (missingFields.length > 0) {
      toast.error(`Please fill in the required fields: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateFields()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      toast.success('User created successfully!'); // Show success toast
      navigate('/signin');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating user. Please try again.'); // Show error toast
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (

    <div className="signupform">
      <Navbar />
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="step-indicator">
          <div className={step >= 1 ? 'active' : ''}></div>
          <div className={step >= 2 ? 'active' : ''}></div>
          <div className={step >= 3 ? 'active' : ''}></div>
          <div className={step >= 4 ? 'active' : ''}></div>
          <div className={step >= 5 ? 'active' : ''}></div>
        </div>

        {step === 3 && (
          <div>
            <h2>Location and Preferences</h2>
            <label>
              Location:
              <input
                type="text"
                name="location"
                className="signupinput"
                value={formData.location}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Location Preferences:
              <input
                type="text"
                name="locationPreferences"
                className="signupinput"
                value={formData.locationPreferences}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Salary Range and Job Type</h2>
            <label>
              Expected Salary (in ₹):
              <input
                type="text"
                name="expectedSalary"
                className="signupinput"
                value={formData.expectedSalary}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Job Type:
              <select
                name="jobType"
                className="signupinput"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="">Select Job Type</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </label>
            <br />
            <label>
              Job Title:
              <Select
                name="jobTitle"
                options={jobOptions}
                className="basic-single"
                classNamePrefix="select"
                onChange={(selectedOption) =>
                  setFormData({ ...formData, jobTitle: selectedOption.value })
                }
                value={jobOptions.find(option => option.value === formData.jobTitle)}
              />
            </label>
            <br />
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2>Personal and Professional Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                className="signupinput"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                className="signupinput"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="password-field">
              Password:
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="signupinput"
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </label>
            <br />
            <label>
              Tech Stack:
              <input
                type="text"
                name="techStack"
                className="signupinput"
                value={formData.techStack}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Skills:
              <Select
                isMulti
                name="skills"
                options={skillsOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSkillsChange}
                value={skillsOptions.filter(option => formData.skills.includes(option.value))}
              />
            </label>
            <br />
            <label>
              Upload Resume:
              <input
                type="file"
                name="resume"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Address:
              <textarea
                name="address"
                className="signupinput"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </label>
            <br />
            <label>
              Are you a fresher?
              <input
                type="checkbox"
                name="isFresher"
                checked={isFresher}
                onChange={handleChange}
              />
            </label>
            <br />

            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}
        {step === 4 && (
          <div>
            {isFresher ? (
              <div>
                <h2>Educational Information</h2>
                <label>
                  Degree:
                  <input
                    type="text"
                    name="degree"
                    className="signupinput"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  University:
                  <input
                    type="text"
                    name="university"
                    className="signupinput"
                    value={formData.university}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  CGPA:
                  <input
                    type="text"
                    name="cgpa"
                    className="signupinput"
                    value={formData.cgpa}
                    onChange={handleChange}
                  />
                </label>
                <br />
              </div>
            ) : (
              <div>
                <h2>Educational and Past Job Details</h2>
                <label>
                  Degree:
                  <input
                    type="text"
                    name="degree"
                    className="signupinput"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  University:
                  <input
                    type="text"
                    name="university"
                    className="signupinput"
                    value={formData.university}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  CGPA:
                  <input
                    type="text"
                    name="cgpa"
                    className="signupinput"
                    value={formData.cgpa}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <h3>Past Job Details</h3>
                {formData.pastJobs.map((job, index) => (
                  <div key={index}>
                    <label>
                      Company:
                      <input
                        type="text"
                        name="company"
                        value={job.company}
                        onChange={(e) => handleJobChange(index, e)}
                      />
                    </label>
                    <br />
                    <label>
                      Role:
                      <input
                        type="text"
                        name="role"
                        value={job.role}
                        onChange={(e) => handleJobChange(index, e)}
                      />
                    </label>
                    <br />
                    <label>
                      Duration:
                      <input
                        type="text"
                        name="duration"
                        value={job.duration}
                        onChange={(e) => handleJobChange(index, e)}
                      />
                    </label>
                    <br />
                    <label>
                      Details:
                      <textarea
                        name="details"
                        value={job.details}
                        onChange={(e) => handleJobChange(index, e)}
                      ></textarea>
                    </label>
                    <br />
                    <button type="button" onClick={addJob}>
                      Add Another Job
                    </button>
                    <br />
                  </div>
                ))}
              </div>
            )}
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
