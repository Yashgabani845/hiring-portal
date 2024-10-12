import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../CSS/contactus.css";
import axios from "axios";

const Contactus = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    query: ""
  });
  // State to hold error messages
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    query: ""
  });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      formIsValid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      formIsValid = false;
    }

    // Validate email with regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      errors.email = "Enter a valid email";
      formIsValid = false;
    }

    // Validate phone number with regex (accepts 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber = "Enter a valid 10-digit phone number";
      formIsValid = false;
    }

    // Validate query
    if (!formData.query.trim()) {
      errors.query = "Query is required";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!validateForm()) {
      return; // Exit if the form is invalid
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/contact',
        { ...formData },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Response:', response.data);

      // Clear form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        query: ''
      });

      // Show alert message
      alert('Contact form has been successfully submitted.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
      <Navbar />
      <div className="contact-us">
        <div className="container">
          <div className="form-section">
            <form className="form-box" onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="row1">
                  <div className="field">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      className="input"
                      id="first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      className="input"
                      id="last-name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="row2">
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      className="input"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      className="input"
                      id="phone"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="query">What do you have in mind?</label>
                  <textarea
                    className="textarea"
                    id="query"
                    name="query"
                    placeholder="Please enter your query..."
                    value={formData.query}
                    onChange={handleChange}
                  ></textarea>
                  {errors.query && <p className="error">{errors.query}</p>}
                </div>
              </div>
              <div className="btn-wrapper">
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="vertical-line"></div>

          <div className="contact-info">
            <div className="info-header">
              <h2>Contact Us</h2>
              <p className="subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="contact-details">
              <div className="contact-item">
                <img
                  className="contact-icon"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET21.jpg"
                  alt="Phone"
                />
                <p>+1258 3258 5679</p>
              </div>
              <div className="contact-item">
                <img
                  className="contact-icon"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg"
                  alt="Email"
                />
                <p>hello@workik.com</p>
              </div>
              <div className="contact-item">
                <img
                  className="contact-icon"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET23.jpg"
                  alt="Address"
                />
                <p>102 street, y cross 485656</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#">
                <img
                  className="social-icon"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg"
                  alt="Mail"
                />
              </a>
              <a href="#">
                <img
                  className="social-icon"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg"
                  alt="Twitter"
                />
              </a>
              <a href="#">
                <img
                  className="social-icon"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"
                  alt="Instagram"
                />
              </a>
              <a href="#">
                <img
                  className="social-icon"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg"
                  alt="Facebook"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contactus;