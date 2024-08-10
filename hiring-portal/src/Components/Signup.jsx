  import React, { useState } from "react";
  import Select from 'react-select';
  import "../CSS/signup.css";
  import axios from 'axios';
  import skillsOptions from './skills.json'; 
  import jobOptions from './upJobs.json'; 

  import { useNavigate } from 'react-router-dom';

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
      pastJobs: [],
      pastJobDetails: ""
    });

    const handleChange = (e) => {
      const { name, value, type, checked, options } = e.target;

      if (type === "checkbox") {
        setIsFresher(checked);
        setFormData({
          ...formData,
          experience: "",
          degree: "",
          university: "",
          cgpa: "",
          pastJobs: [],
          pastJobDetails: ""
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
    

    const nextStep = () => {
      setStep(step + 1);
    };

    const prevStep = () => {
      setStep(step - 1);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData); 
      try {
        const response = await axios.post('http://localhost:5000/api/users/signup', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error submitting form:', error.response.data);
      }

          navigate('/signin');

    };
  
  
 

    return (
      <div className="signupform">
        <h1>Signup Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="step-indicator">
            <div className={step >= 1 ? 'active' : ''}></div>
            <div className={step >= 2 ? 'active' : ''}></div>
            <div className={step >= 3 ? 'active' : ''}></div>
            <div className={step >= 4 ? 'active' : ''}></div>
            <div className={step >= 5 ? 'active' : ''}></div>
          </div>
          {step === 1 && (
            <div>
              <h2>Welcome to Hirehub</h2>
              <p>Welcome to our platform! Let's get started with your registration.</p>
              <button type="button" onClick={nextStep}>
                Start
              </button>
            </div>
          )}
          {step === 2 && (
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
          {step === 3 && (
  <div>
    <h2>Salary Range and Job Type</h2>
    <label>
      Expected Salary   (in  &#8377;):
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
          {step === 4 && (
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
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  className="signupinput"
                  value={formData.password}
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
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          )}
          {step === 5 && (
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
                  <h2>Past Job Details</h2>
                  <label>
                    Past Jobs:
                    <input
                      type="text"
                      name="pastJobs"
                      className="signupinput"
                      value={formData.pastJobs.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pastJobs: e.target.value.split(",").map((job) => job.trim())
                        })
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Experience:
                    <input
                      type="text"
                      name="experience"
                      className="signupinput"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    Details about Past Jobs:
                    <textarea
                      name="pastJobDetails"
                      className="signupinput"
                      value={formData.pastJobDetails}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                  <br />
                </div>
              )}
              <button type="button" onClick={prevStep}>
                Previous
              </button>
            <a href="/signin">  <button type="submit">Submit</button></a>  
            </div>
          )}
        </form>
      </div>
    );
  };

  export default Signup;
