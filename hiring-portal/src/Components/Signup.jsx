import React, { useState } from "react";
import "../CSS/signup.css";

const Signup = () => {
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
    languages: [],
    degree: "",
    university: "",
    cgpa: "",
    pastJobs: [],
    pastJobDetails: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked, options } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === "checkbox") {
      let updatedSkills = [...formData.skills];
      if (checked) {
        updatedSkills.push(value);
      } else {
        updatedSkills = updatedSkills.filter(skill => skill !== value);
      }
      setFormData({
        ...formData,
        skills: updatedSkills
      });
    } else if (name === "languages") {
      const selectedLanguages = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData({
        ...formData,
        languages: selectedLanguages
      });
    } else if (name === "isFresher") {
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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic, e.g., sending data to the server
  };

  return (
    <div className="signupform">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Welcome</h2>
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
              Expected Salary Range:
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
              <input
                type="text"
                name="jobTitle"
                className="signupinput"
                value={formData.jobTitle}
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
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="JavaScript"
                  checked={formData.skills.includes("JavaScript")}
                  onChange={handleChange}
                /> JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="React"
                  checked={formData.skills.includes("React")}
                  onChange={handleChange}
                /> React
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="Node.js"
                  checked={formData.skills.includes("Node.js")}
                  onChange={handleChange}
                /> Node.js
              </label>
              {/* Add more skills as needed */}
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
              Languages:
              <select
                name="languages"
                className="signupinput"
                multiple
                value={formData.languages}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                {/* Add more languages as needed */}
              </select>
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
                  Past Job Details:
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
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
