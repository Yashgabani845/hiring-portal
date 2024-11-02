import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../CSS/About.module.css";
import searchimage from "../assests/job_search.jpg";
import js1 from "../assests/js1.jpg";
import email from "../assests/email.jpg";
import result from "../assests/result.png";
import compile from "../assests/compile1.png";

const featureData = [
  {
    image: searchimage,
    title: "Client Side",
    description: "As a client, you can:",
    listItems: [
      "Browse Job Listings: Explore a wide range of job listings across various industries.",
      "Apply for Jobs: Submit your applications directly through our platform.",
      "Receive Updates: Get detailed information about assessment rounds and interview schedules.",
      "External Job Links: Redirect to external job websites for more information."
    ]
  },
  {
    image: js1,
    title: "Owner Side",
    description: "As a job owner, you can:",
    listItems: [
      "View and Manage Jobs: Access and manage all job listings you have posted.",
      "Add New Jobs: Easily create and add new job listings to attract potential candidates.",
      "Shortlist Candidates: Review applications and shortlist candidates.",
      "Conduct Assessments: Set up and conduct assessments for candidates."
    ]
  },
  {
    image: compile,
    title: "Integrated Compiler and Coding Environment",
    description: "Our platform provides a comprehensive coding environment where both clients and owners can:",
    listItems: [
      "Write and Test Code: Utilize our integrated compiler to write, test, and debug code.",
      "Support for Multiple Languages: Choose from a variety of programming languages.",
      "Coding Challenges: Participate in coding challenges to showcase your skills."
    ]
  },
  {
    image: email,
    title: "Automated Mailing",
    description: "Stay updated with our automated mailing system that handles:",
    listItems: [
      "Application Notifications: Receive automated notifications about your job applications.",
      "Interview Scheduling: Get reminders and schedules for upcoming interviews.",
      "Assessment Results: Receive feedback and results from assessments promptly.",
      "Rejection and Acceptance: Get automated notifications about your job application status."
    ]
  },
  {
    image: result,
    title: "Result Management",
    description: "Efficiently manage and review results from:",
    listItems: [
      "Job Applications: Track and review the results of job applications.",
      "Assessment Tests: Evaluate test results from assessments.",
      "Interviews: Manage interview results and feedback."
    ]
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <div className={styles.aboutContainer}>
        <div className={styles.featureSection} data-aos="zoom-in">
          <h1>Welcome to Hiring Hub</h1>
          <p>Our comprehensive platform for job searching and recruitment.</p>
        </div>

        <div className={styles.features}>
          {featureData.map((feature, index) => (
            <div className={styles.feature} key={index} data-aos="zoom-in">
              <img src={feature.image} alt={feature.title} className={styles.featureImage} />
              <div className={styles.featureText}>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <ul>
                  {feature.listItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;