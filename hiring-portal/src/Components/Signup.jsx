import React, { useState } from "react";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    degree: "",
    university: "",
    cgpa: "",
    company: "",
    role: "",
    duration: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to go to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Function to go to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can add the logic to send the form data to the server here
  };

  return (
    <div>
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
                value={formData.password}
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
            <h2>Educational Information</h2>
            <label>
              Degree:
              <input
                type="text"
                name="degree"
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
                value={formData.cgpa}
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
            <h2>Experience</h2>
            <label>
              Company:
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Role:
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Duration:
              <input
                type="text"
                name="duration"
                value={formData.duration}
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
