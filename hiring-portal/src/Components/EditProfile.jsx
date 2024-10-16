import React, { useEffect, useState } from "react";
import Select from 'react-select';
import "../CSS/signup.css";
import axios from 'axios';
import skillsOptions from './skills.json'; 
import jobOptions from './upJobs.json'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/firebase';
import Navbar from "./Navbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [step, setStep] = useState(1);
  const [isFresher, setIsFresher] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [formData, setFormData] = useState({
    name: "",
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // const email = localStorage.getItem("userEmail");
        if (email) {
          const response = await fetch(`http://localhost:5000/api/users/profile?email=${encodeURIComponent(email)}`);
          if (!response.ok) throw new Error("Failed to fetch user profile");
          const userData = await response.json();
          setUser(userData);

          // Populate formData with fetched user data
          setFormData({
            name: userData.name || "",
            location: userData.location || "",
            locationPreferences: userData.locationPreferences || "",
            expectedSalary: userData.expectedSalary || "",
            jobType: userData.jobType || "",
            jobTitle: userData.jobTitle || "",
            techStack: userData.profileDetails.techStack || "",
            skills: userData.profileDetails.skills || [],
            address: userData.profileDetails.address || "",
            degree: userData.profileDetails.education.degree || "",
            university: userData.profileDetails.education.university || "",
            cgpa: userData.profileDetails.education.cgpa || "",
            // company: userData.profileDetails.pastJobs.company || "",
            // role: userData.profileDetails.pastJobs.role || "",
            // duration: userData.profileDetails.pastJobs.duration || "",
            // details: userData.profileDetails.pastJobs.details || "",
            pastJobs: userData.profileDetails.pastJobs.length > 0 
            ? userData.profileDetails.pastJobs 
            : [{ company: "", role: "", duration: "", details: "" }]
          });

          setLoading(false);
        } else {
          setError("No email found in localStorage");
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "resume" && files[0]) {
      const file = files[0];
      const storageRef = ref(storage, `resume/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
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
    });
} else {
    setFormData({
        ...formData,
        [name]: value,
        pastJobs: [{ company: "", role: "", duration: "", details: "" }] // Reset past jobs if fresher
      });
    }
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData({
      ...formData,
    //   skills: selectedOptions.map(option => option.value)
    skills: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
    console.log('skills',formData.skills);
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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users/editProfile/${email}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Profile updated successfully!'); 
      navigate('/profile');
    } catch (error) {
      console.error('Error submitting form:', error.response?.data);
      toast.error('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="signupform">
      <h1>Edit Profile</h1>
      <p className="mb-2">{email}</p>
      <form onSubmit={handleSubmit}>
        {/* Step Indicators */}
        <div className="step-indicator">
          <div className={step >= 1 ? 'active' : ''}></div>
          <div className={step >= 2 ? 'active' : ''}></div>
          <div className={step >= 3 ? 'active' : ''}></div>
          <div className={step >= 4 ? 'active' : ''}></div>
        </div>
      
        {/* Step 1: Personal Information */}
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
                options={skillsOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                // onChange={handleSkillsChange}
                onChange={(selectedOptions) => {
                    // Get the updated skills list
                    const updatedSkills = selectedOptions ? selectedOptions.map(option => option.value) : [];
              
                    // Log the updated skills (to see the immediate change)
                    console.log("Updated skills:", updatedSkills);
              
                    // Update the formData.skills state
                    setFormData((prevData) => ({
                        ...prevData,
                        skills: updatedSkills
                      }));
                    console.log('first',formData.skills);
                  }}
                value={skillsOptions.filter(option => formData.skills.includes(option.value))}
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

        {/* Step 2: Job and Education Information */}
        {step === 2 && (
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

        {/* Step 3: Location and Preferences */}
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
            <label>
              Resume (Upload):
              <input type="file" name="resume" accept=".pdf" onChange={handleChange} />
            </label>
            <br />
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit">Update Profile</button>
          </div>
        )}

        {/* step 4: job preference */}
        {step === 4 && (
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
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
