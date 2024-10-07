import React, { useState, useEffect } from 'react';
import '../CSS/employer.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import employer1 from "../assests/employer.png";
import employer2 from "../assests/employer2.jpg";
import employer3 from "../assests/employer3.png";
import emp1 from "../assests/emp1.jpg";
import emp2 from "../assests/emp2.jpg";
import emp3 from "../assests/emp3.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Employer = () => {
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Register');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            axios.get('http://localhost:5000/api/users/profile', {
                params: { email }
            })
                .then(response => {
                    const { role } = response.data;
                    if (role === 'owner') {
                        setButtonText('My Dashboard');
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, []);

    const handlePostJob = () => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            axios.get('http://localhost:5000/api/users/profile', {
                params: { email }
            })
                .then(response => {
                    const { role } = response.data;
                    if (role === 'owner') {
                        navigate("/ownerside");
                    } else {
                        navigate("/company");
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    };

    const handleImageLoad = () => {
        setLoading(false); // Set loading to false when images are loaded
    };

    return (
        <div className="employer">
            <Navbar />

            <section className="main-section">
                <div className="main-content">
                    <center>
                        <div className="slogan">
                            <h1> Partner in Hiring Excellence</h1>
                            <p>Empowering employers with cutting-edge tools for efficient hiring.</p>
                        </div>
                    </center>
                    <center>
                        <div className="services">
                            <h2>Job Posting <hr /></h2>
                            <h2>Assessment <hr /></h2>
                            <h2>Shortlisting <hr /></h2>
                        </div>
                        <p>Join us and start hiring the best talent today!</p>
                        <button className='regcom' onClick={handlePostJob}>{buttonText}</button>
                    </center>
                </div>
                <div className="image-section">
                    {loading && <div className="spinner"><ClipLoader size={50} /></div>}
                    <img src={employer1} className="emp1" alt="Hiring" loading='lazy' onLoad={handleImageLoad} />
                </div>
            </section>

            <section className="quality-job-management">
                <div className="top-div">
                    <h5>OUR SERVICES & PRODUCTS</h5>
                    <h2>Hire According to Your Preference Across the Globe</h2>
                </div>
                <div className="bottom-div">
                    <div className="qleft-div">
                        <center>
                            <img src={employer2} className='emp2' alt="Quality Job Management" onLoad={handleImageLoad} />
                        </center>
                    </div>
                    <div className="qright-div">
                        <div className="quality-grid">
                            <div className="quality-item">
                                <i className="fas fa-stopwatch icon blue-icon"></i>
                                <p>Easy to Post Jobs</p>
                            </div>
                            <div className="quality-item">
                                <i className="fas fa-dollar-sign icon blue-icon"></i>
                                <p>Free</p>
                            </div>
                            <div className="quality-item">
                                <i className="fas fa-smile icon blue-icon"></i>
                                <p>No Limit on Jobs</p>
                            </div>
                            <div className="quality-item">
                                <i className="fas fa-chart-line icon blue-icon"></i>
                                <p>Reach to Most People</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shortlisting">
                <div className="left-div">
                    <h2>Efficient Shortlisting Candidates</h2>
                    <div className="feature-grid">
                        <div className="feature-item">
                            <i className="fas fa-university icon blue-icon"></i>
                            <p>Shortlist Based on College</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-file-alt icon blue-icon"></i>
                            <p>Shortlist Based on Resume</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-genderless icon blue-icon"></i>
                            <p>Gender-based Shortlisting</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-envelope icon blue-icon"></i>
                            <p>Contact via Email</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-mail-bulk icon blue-icon"></i>
                            <p>Automatic Mail System</p>
                        </div>
                    </div>
                </div>
                <div className="right-div">
                    {loading && <div className="spinner"><ClipLoader size={50} /></div>}
                    <img src={employer3} className='emp3' alt="Shortlisting" onLoad={handleImageLoad} />
                </div>
            </section>

            <section className="whats-new">
                <center><h2>What's New</h2></center>
                <div className="card-grid">
                    <div className="card">
                        <img src={emp1} alt="Shortlisting Candidates" onLoad={handleImageLoad} />
                        <h3>Shortlisting Candidates</h3>
                        <p>Based on your requirements.</p>
                    </div>
                    <div className="card">
                        <img src={emp2} alt="Online Coding Rounds" onLoad={handleImageLoad} />
                        <h3>Online Coding Rounds</h3>
                        <p>Host coding rounds on our platform.</p>
                    </div>
                    <div className="card">
                        <img src={emp3} alt="Mailing System" onLoad={handleImageLoad} />
                        <h3>Mailing System</h3>
                        <p>Automate mail for each round activity.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Employer;
