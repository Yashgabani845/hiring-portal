import React from "react";
import "../CSS/footer.css";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGit, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="/">About Us</a></li>
                        <li><a href="/">Careers</a></li>
                        <li><a href="/">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="/">Blog</a></li>
                        <li><a href="/">FAQs</a></li>
                        <li><a href="/">Support</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="/">Privacy Policy</a></li>
                        <li><a href="/">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="/"><FaLinkedin /></a>
                        <a href="/"><FaTwitter /></a>
                        <a href=""><FaGithub/></a>
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Hirehub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
