import React, { useEffect, useState } from "react";
import styles from "../CSS/footer.module.css";
import { FaLinkedin, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleTranslate from "./GoogleTranslate";
import SignInWithGoogle from "./SignInWithGoogle";
import VisitorCounter from "./VisitorCount";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [subscribenews, Setsubscribenews] = useState(false);
  // Handle form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    if (!email) {
      setMessage("Please enter a valid email.");
      clearMessageAndResetEmail(); // Clear both message and email after timeout
      return;
    }

    try {
      Setsubscribenews(true);
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for subscribing!");
      } else {
        setMessage(data.message || "Subscription failed, please try again.");
        Setsubscribenews(false);
      }

      clearMessageAndResetEmail(); // Clear both message and email after timeout
      Setsubscribenews(false);
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("An error occurred, please try again later.");
      clearMessageAndResetEmail(); // Clear both message and email after timeout
      Setsubscribenews(false);
    }
  };

  // Function to clear the message and reset email after a timeout (3 to 5 seconds)
  const clearMessageAndResetEmail = () => {
    setTimeout(() => {
      setMessage(""); // Clear the message
      setEmail(""); // Clear the email input field
    }, 4000); // 4000ms = 4 seconds (adjustable)
  };

  useEffect(() => {
    // Configure the chatbot
    window.embeddedChatbotConfig = {
      chatbotId: "o4KUJL6ZjS6hreRuBl_g2",
      domain: "www.chatbase.co",
    };

    // Dynamically create the script element
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <h4>Subscribe to our Newsletter</h4>

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={subscribenews}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>

      <VisitorCounter />

      <div className={styles.footerContainer}>
        <div className={styles.flex}>
          <div className={styles.footerColumn}>
            <h3>Company</h3>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/">Careers</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.footerColumn}>
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="#faqs">FAQs</a>
              </li>
              <li>
                <a href="/">Support</a>
              </li>
              <li>
                <a href="/contributor">Our Contributors</a>
              </li>
              <li>
                <a href="/discussionForum">Discussion Forum</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.footerColumn}>
            <h3>Legal</h3>
            <ul>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-and-conditions">Terms of Service</a>
              </li>
              <li>
                <a href="/terms-of-use">Terms of use</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.footerColumn}>
            <h3>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a
                href="https://www.linkedin.com/in/yash-gabani-527886258/"
                className={styles.linkedin}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/Hirehub280355"
                className={styles.twitter}
              >
                <FaXTwitter />
              </a>
              <a
                href="https://github.com/Yashgabani845"
                className={styles.github}
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/yash845_/"
                className={styles.instagram}
              >
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/" className={styles.facebook}>
                <FaFacebook />
              </a>
            </div>
            <div>
              <SignInWithGoogle />
            </div>
            <div className={`${styles.translate} ${styles.flex} ml-4 my-auto`}>
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Hirehub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
