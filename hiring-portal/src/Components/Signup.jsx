import React, { useState } from "react";
import "../CSS/signup.css";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    resume: null, // File upload for resume
    techStack: [],
    skills: [],
    experience: "",
    address: "",
    languages: [],
    jobType: "",
    expectedSalary: ""
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
            <h2>Personal Information</h2>
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
              Upload Resume:
              <input
                type="file"
                name="resume"
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Skills and Experience</h2>
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
            <h2>Location and Preferences</h2>
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
