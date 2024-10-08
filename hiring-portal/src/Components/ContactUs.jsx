import pic from '../assests/contact.webp';
import React from 'react';
import Navbar from './Navbar';
const ContactUs = () => {
  return (
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
        <Navbar/>
        <div className="contact-bg">
          <h3>Get in Touch with Us</h3>
          <h2>Contact Us</h2>
          <div className="line">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text">
            We're here to assist you. Reach out to us for any inquiries or assistance you may need.
          </p>
        </div>

        <div className="contact-body">
          <div className="contact-info">
            <div>
              <span><i className="fas fa-mobile-alt"></i></span>
              <span>Phone No.</span>
              <span className="text">+91-964-768-5675</span>
            </div>
            <div>
              <span><i className="fas fa-envelope-open"></i></span>
              <span>E-mail</span>
              <span className="text">hirehubofficial@gmail.com</span>
            </div>
            <div>
              <span><i className="fas fa-map-marker-alt"></i></span>
              <span>Address</span>
              <span className="text">Tejashwi Nagar Jalandhar Cantt, Jalandhar, Pin Code:- 144005.</span>
            </div>
            <div>
              <span><i className="fas fa-clock"></i></span>
              <span>Opening Hours</span>
              <span className="text">Monday - Friday (9:00 AM to 5:00 PM)</span>
            </div>
          </div>

          <div className="contact-form">
            <form>
              <div>
                <input type="text" className="form-control" placeholder="First Name" />
                <input type="text" className="form-control" placeholder="Last Name" />
              </div>
              <div>
                <input type="email" className="form-control" placeholder="E-mail" />
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <textarea className="form-control" rows="6" placeholder="Message"></textarea>
              <button type="submit" className="send-btn">Send Message</button>
            </form>
            <div>
              <img src={pic} alt="Contact Us" />
            </div>
          </div>
        </div>

        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.604039385933!2d75.58046937553776!3d31.32974775698723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a5747a9eb91%3A0xc74b34c05aa5b4b8!2sTejashwi%20Nagar%2C%20Jalandhar%20Cantt%2C%20Jalandhar%2C%20Punjab%20144005!5e0!3m2!1sen!2sin!4v1696772806485!5m2!1sen!2sin"
          className="google-map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <footer className="contact-footer">
        <h3>Follow Us</h3>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;