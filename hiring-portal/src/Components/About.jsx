import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../CSS/About.module.css";
import searchimage from "../assests/job_search.jpg";
import js1 from "../assests/js1.jpg";
import email from "../assests/email.jpg";
import result from "../assests/result.png";
import compile from "../assests/compile1.png";
import { FaLaptopCode, FaEnvelopeOpenText, FaUserTie, FaChartBar, FaSearch } from "react-icons/fa";

const featureData = [
  {
    image: searchimage,
    icon: <FaSearch className={styles.icon} />,
    title: "Client Side 🧑‍💼",
    description: "As a client, you can:",
    listItems: [
      "🔍 Browse job listings.",
      "📤 Apply for jobs easily.",
      "📅 Receive interview schedules.",
      "🌐 Redirect to external job portals."
    ]
  },
  {
    image: js1,
    icon: <FaUserTie className={styles.icon} />,
    title: "Owner Side 👨‍💻",
    description: "As a job owner, you can:",
    listItems: [
      "🗂 Manage job listings.",
      "➕ Add new job opportunities.",
      "✅ Shortlist candidates.",
      "📝 Conduct assessments."
    ]
  },
  {
    image: compile,
    icon: <FaLaptopCode className={styles.icon} />,
    title: "Integrated Coding 👨‍💻",
    description: "Our platform offers:",
    listItems: [
      "✍️ Write and test code.",
      "💡 Multiple language support.",
      "🏆 Coding challenges to build skills."
    ]
  },
  {
    image: email,
    icon: <FaEnvelopeOpenText className={styles.icon} />,
    title: "Automated Mailing 📬",
    description: "You will be notified for:",
    listItems: [
      "📥 Application updates.",
      "🗓 Interview schedules.",
      "📊 Assessment results.",
      "📤 Acceptance/Rejection alerts."
    ]
  },
  {
    image: result,
    icon: <FaChartBar className={styles.icon} />,
    title: "Result Management 📊",
    description: "Track all results from:",
    listItems: [
      "📝 Job applications.",
      "📈 Test evaluations.",
      "💬 Interview feedback."
    ]
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <div className={styles.aboutContainer}>
        <div className={styles.header}>
          <h1>👋 Welcome to Hiring Hub</h1>
          <p>Your one-stop destination for job seekers and recruiters!</p>
        </div>

        <div className={styles.features}>
          {featureData.map((feature, index) => (
            <div className={styles.featureCard} key={index} >
              <div className={styles.cardTop}>
                <img src={feature.image} alt={feature.title} className={styles.featureImage} />
                {feature.icon}
              </div>
              <div className={styles.cardContent}>
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
