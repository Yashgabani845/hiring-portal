import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

import pic from "../assests/contact.webp";

const Contactus = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    query: "",
  });

  const [errors, setErrors] = useState({});
  // const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      formIsValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      formIsValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      errors.email = "Enter a valid email";
      formIsValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber = "Enter a valid 10-digit phone number";
      formIsValid = false;
    }

    if (!formData.query.trim()) {
      errors.query = "Query is required";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);


      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        query: "",
      });
      if (response.status === 201) {
        alert("Contact form has been successfully submitted.");
      } else {
        alert("error in submission");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({
        submit:
          "There was an issue with your submission. Please try again later.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user types
  };

  return (
    <>
      <div>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');

          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
          body {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.5;
          }
          .contact-bg {
            height: 40vh;
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(assets/booking.jpeg);
            background-position: 50% 100%;
            background-repeat: no-repeat;
            background-attachment: fixed;
            text-align: center;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .contact-bg h3 {
            font-size: 1.3rem;
            font-weight: 400;
          }
          .contact-bg h2 {
            font-size: 3rem;
            text-transform: uppercase;
            padding: 0.4rem 0;
            letter-spacing: 4px;
          }
          .line div {
            margin: 0 0.2rem;
          }
          .line div:nth-child(1),
          .line div:nth-child(3) {
            height: 3px;
            width: 70px;
            background: #0564c9;
            border-radius: 5px;
          }
          .line {
            display: flex;
            align-items: center;
          }
          .line div:nth-child(2) {
            width: 10px;
            height: 10px;
            background: #0564c9;
            border-radius: 50%;
          }
          .text {
            font-weight: 300;
            opacity: 0.9;
          }
          .contact-bg .text {
            margin: 1.6rem 0;
          }
          .contact-body {
            max-width: 1320px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .contact-info {
            margin: 2rem 0;
            text-align: center;
            padding: 2rem 0;
          }
          .contact-info span {
            display: block;
          }
          .contact-info div {
            margin: 0.8rem 0;
            padding: 1rem;
          }
          .contact-info span .fas {
            font-size: 2rem;
            padding-bottom: 0.9rem;
            color: #0564c9;
          }
          .contact-info div span:nth-child(2) {
            font-weight: 500;
            font-size: 1.1rem;
          }
          .contact-info .text {
            padding-top: 0.4rem;
          }
          .contact-form {
            padding: 2rem 0;
            border-top: 1px solid #c7c7c7;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
            align-items: start;
          }
          .contact-form form {
            padding-bottom: 1rem;
          }
          .form-control {
            width: 100%;
            border: 1.5px solid #c7c7c7;
            border-radius: 5px;
            padding: 0.7rem;
            margin: 0.6rem 0;
            font-family: 'Open Sans', sans-serif;
            font-size: 1rem;
            outline: 0;
          }
          .form-control:focus {
            box-shadow: 0 0 6px -3px rgba(48, 48, 48, 1);
          }
          .contact-form form div {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 0.6rem;
          }
          .send-btn {
            font-family: 'Open Sans', sans-serif;
            font-size: 1rem;
            text-transform: uppercase;
            color: #fff;
            background: #0564c9;
            border: none;
            border-radius: 5px;
            padding: 0.7rem 1.5rem;
            cursor: pointer;
            transition: all 0.4s ease;
          }
          .send-btn:hover {
            opacity: 0.8;
          }
          .contact-form > div img {
            width: 100%;
            max-width: 300px;
            height: auto;
            object-fit: cover;
          }
          .google-map {
            width: 100%;
            height: 450px;
            border: none;
            margin-top: 2rem;
          }
          .contact-footer {
            padding: 2rem 0;
            background: #000;
          }
          .contact-footer h3 {
            font-size: 1.3rem;
            color: #fff;
            margin-bottom: 1rem;
            text-align: center;
          }
          .social-links {
            display: flex;
            justify-content: center;
          }
          .social-links a {
            text-decoration: none;
            width: 40px;
            height: 40px;
            color: #fff;
            border: 2px solid #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.4rem;
            transition: all 0.4s ease;
          }
          .social-links a:hover {
            color: #0564c9;
            border-color: #0564c9;
          }

          @media screen and (max-width: 768px) {
            .contact-form {
              grid-template-columns: 1fr;
            }
            .contact-form > div:last-child {
              order: -1;
            }
          }

          @media screen and (min-width: 768px) {
            .contact-bg .text {
              width: 70%;
              margin-left: auto;
              margin-right: auto;
            }
            .contact-info {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media screen and (min-width: 992px) {
            .contact-bg .text {
              width: 50%;
            }
          }

          @media screen and (min-width: 1200px) {
            .contact-info {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}
        </style>
        <section className="contact-section">
          <Navbar />
          <div className="contact-bg">
            <h3 data-aos="zoom-in">Get in Touch with Us</h3>
            <h2 data-aos="zoom-in">Contact Us</h2>
            <div className="line" data-aos="zoom-in">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="text" data-aos="zoom-in">
              We're here to assist you. Reach out to us for any inquiries or
              assistance you may need.
            </p>
          </div>

          <div className="contact-body">
            <div className="contact-info" data-aos="zoom-in">
              <div>
                <span>
                  <i className="fas fa-mobile-alt"></i>
                </span>
                <span>Phone No.</span>
                <span className="text">+91 7046996816</span>
              </div>
              <div>
                <span>
                  <i className="fas fa-envelope-open"></i>
                </span>
                <span>E-mail</span>
                <span className="text">gabaniyash846@gmail.com</span>
              </div>
              <div>
                <span>
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span>Address</span>
                <span className="text">
                  2,Muktanand Society Ved Road Surat Pin-Code : 395004
                </span>
              </div>
              <div>
                <span>
                  <i className="fas fa-clock"></i>
                </span>
                <span>Opening Hours</span>
                <span className="text">
                  Monday - Friday (9:00 AM to 5:00 PM)
                </span>
              </div>
            </div>

            <div className="contact-form" data-aos="zoom-in">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="form-control"
                    id="first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                  )}
                  <input
                    className="form-control"
                    id="last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                  <input
                    className="form-control"
                    id="phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Number"
                  />
                  {errors.phoneNumber && (
                    <p className="error">{errors.phoneNumber}</p>
                  )}
                </div>

                <textarea
                  className="form-control"
                  id="query"
                  name="query"
                  placeholder="Please enter your query..."
                  value={formData.query}
                  onChange={handleChange}
                ></textarea>
                {errors.query && <p className="error">{errors.query}</p>}
                <button type="submit" className="send-btn">
                  Send Message
                </button>
              </form>
              <div>
                <img src={pic} alt="Contact Us" />
              </div>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.2636923821633!2d72.87936536346761!3d22.67750816815465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b3c654679bd%3A0x7fec0936b8b30f97!2sBlossom%20Aura!5e0!3m2!1sen!2sin!4v1729280785053!5m2!1sen!2sin"
            className="google-map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        <footer className="contact-footer">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </footer>
      </div>
      );
    </>
  );
};

export default Contactus;
