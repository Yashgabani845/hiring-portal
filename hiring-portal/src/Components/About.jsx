import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../CSS/about.css";
import searchimage from "../assests/job_search.jpg";
import js1 from "../assests/js1.jpg";
import email from "../assests/email.jpg";
import result from "../assests/result.png";
import compile from "../assests/compile1.png";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="feature-section">
          <h1>Welcome to Hiring Hub</h1>
          <p>Our comprehensive platform for job searching and recruitment.</p>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-content">
              <img
                src={searchimage}
                alt="Client Side"
                className="feature-image"
              />
              <div className="feature-text">
                <h2>Client Side</h2>
                <p>As a client, you can:</p>
                <ul>
                  <li>
                    <strong>Browse Job Listings:</strong> Explore a wide range
                    of job listings across various industries and locations. Our
                    advanced search and filter options help you find the best
                    opportunities tailored to your preferences.
                  </li>
                  <li>
                    <strong>Apply for Jobs:</strong> Submit your applications
                    directly through our platform. Track the status of your
                    applications and receive timely updates.
                  </li>
                  <li>
                    <strong>Receive Updates:</strong> Get detailed information
                    about assessment rounds, interview schedules, and other
                    relevant updates directly from job owners.
                  </li>
                  <li>
                    <strong>External Job Links:</strong> For external job
                    postings, seamlessly redirect to the respective job website
                    for more information and application.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <img src={js1} alt="Owner Side" className="feature-image" />
              <div className="feature-text">
                <h2>Owner Side</h2>
                <p>As a job owner, you can:</p>
                <ul>
                  <li>
                    <strong>View and Manage Jobs:</strong> Access and manage all
                    job listings you have posted. Edit, update, or remove job
                    postings as needed.
                  </li>
                  <li>
                    <strong>Add New Jobs:</strong> Easily create and add new job
                    listings to attract potential candidates. Provide detailed
                    job descriptions and requirements.
                  </li>
                  <li>
                    <strong>Shortlist Candidates:</strong> Review applications,
                    shortlist candidates based on their qualifications, and
                    schedule interviews.
                  </li>
                  <li>
                    <strong>Conduct Assessments:</strong> Set up and conduct
                    assessments for candidates. Review results and make informed
                    hiring decisions.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <img src={compile} alt="Compiler" className="feature-image" />
              <div className="feature-text">
                <h2>Integrated Compiler and Coding Environment</h2>
                <p>
                  Our platform provides a comprehensive coding environment where
                  both clients and owners can:
                </p>
                <ul>
                  <li>
                    <strong>Write and Test Code:</strong> Utilize our integrated
                    compiler to write, test, and debug code in real-time within
                    the platform.
                  </li>
                  <li>
                    <strong>Support for Multiple Languages:</strong> Choose from
                    a variety of programming languages and tools to suit your
                    coding needs.
                  </li>
                  <li>
                    <strong>Coding Challenges:</strong> Participate in coding
                    challenges and assessments to showcase your skills or
                    evaluate candidates effectively.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <img
                src={email}
                alt="Automated Mailing"
                className="feature-image"
              />
              <div className="feature-text">
                <h2>Automated Mailing</h2>
                <p>
                  Stay updated with our automated mailing system that handles:
                </p>
                <ul>
                  <li>
                    <strong>Application Notifications:</strong> Receive
                    automated notifications about your job applications and
                    their status.
                  </li>
                  <li>
                    <strong>Interview Scheduling:</strong> Get reminders and
                    schedules for upcoming interviews directly via email.
                  </li>
                  <li>
                    <strong>Assessment Results:</strong> Receive feedback and
                    results from assessments and tests promptly.
                  </li>
                  <li>
                    <strong>Rejection and Acceptance:</strong> Get automated
                    notifications about the status of your job application,
                    including acceptance or rejection.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <img
                src={result}
                alt="Result Management"
                className="feature-image"
              />
              <div className="feature-text">
                <h2>Result Management</h2>
                <p>Efficiently manage and review results from:</p>
                <ul>
                  <li>
                    <strong>Job Applications:</strong> Track and review the
                    results of job applications, including candidate
                    qualifications and application statuses.
                  </li>
                  <li>
                    <strong>Assessment Tests:</strong> Evaluate test results
                    from assessments to make informed hiring decisions.
                  </li>
                  <li>
                    <strong>Interviews:</strong> Manage interview results,
                    feedback, and notes to streamline the hiring process.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
