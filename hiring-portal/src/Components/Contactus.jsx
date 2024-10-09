import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../CSS/contactus.css";

const Contactus = () => {
  return (
    <>
      <Navbar />
      <div className="contact-us">
        <div className="container">
          <div className="form-section">
            <form className="form-box">
              <div className="form-fields">
                <div className="row1">
                  <div className="field">
                    <label htmlFor="first-name">First Name</label>
                    <input className="input" id="first-name" name="FirstName" />
                  </div>
                  <div className="field">
                    <label htmlFor="last-name">Last Name</label>
                    <input className="input" id="last-name" name="LastName" />
                  </div>
                </div>
                <div className="row2">
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input className="input" id="email" name="Email" />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone Number</label>
                    <input className="input" id="phone" name="PhoneNumber" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="message">What do you have in mind?</label>
                  <textarea
                    className="textarea"
                    id="message"
                    placeholder="Please enter your query..."
                  ></textarea>
                </div>
              </div>
              <div className="btn-wrapper">
                <button className="submit-btn">Submit</button>
              </div>
            </form>
          </div>
          <div className="vertical-line"></div> {/* Vertical line here */}

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
