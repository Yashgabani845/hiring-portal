import React, { useState, useEffect } from 'react';
import '../CSS/profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import profilepic from "../profile.jpg"
import Navbar from './Navbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    
    if (email) {
      axios.get(`http://localhost:5000/api/users/profile`, {
        params: { email }
      })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    } else {
      setError('No email found in localStorage');
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found</p>;

  const {
    name, email, profileDetails, location, locationPreferences, expectedSalary, jobType, jobTitle, resume, role
  } = user;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <img src={profilepic} alt="Avatar" className="profile-avatar" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-email">{email}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          {role === 'owner' && (
            <button className="manage-jobs-button" onClick={() => navigate('/owner')}>Manage Jobs</button>
          )}
        </div>
        <div className="profile-details">
          <section className="profile-section">
            <div className="section-header">
              <DescriptionIcon className="section-icon" />
              <h2>Education</h2>
            </div>
            {profileDetails.education ? (
              <div className="education-info">
                <p><strong>Degree:</strong> {profileDetails.education.degree}</p>
                <p><strong>University:</strong> {profileDetails.education.university}</p>
                <p><strong>CGPA:</strong> {profileDetails.education.cgpa}</p>
              </div>
            ) : <p>No education details available.</p>}
          </section>
          <section className="profile-section">
            <div className="section-header">
              <WorkIcon className="section-icon" />
              <h2>Experience</h2>
            </div>
            {profileDetails.experience.length > 0 ? (
              <ul className="experience-list">
                {profileDetails.experience.map((exp, index) => (
                  <li key={index} className="experience-item">
                    <p><strong>Company:</strong> {exp.company}</p>
                    <p><strong>Role:</strong> {exp.role}</p>
                    <p><strong>Duration:</strong> {exp.duration}</p>
                    <p><strong>Details:</strong> {exp.details}</p>
                  </li>
                ))}
              </ul>
            ) : <p>No experience details available.</p>}
          </section>
          <section className="profile-section">
            <div className="section-header">
              <SettingsIcon className="section-icon" />
              <h2>Skills</h2>
            </div>
            {profileDetails.skills.length > 0 ? (
              <ul className="skills-list">
                {profileDetails.skills.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
                ))}
              </ul>
            ) : <p>No skills listed.</p>}
          </section>
          <section className="profile-section">
            <div className="section-header">
              <LocationOnIcon className="section-icon" />
              <h2>Address</h2>
            </div>
            <p>{profileDetails.address}</p>
          </section>
          <section className="profile-section">
            <div className="section-header">
              <ContactMailIcon className="section-icon" />
              <h2>Languages</h2>
            </div>
            {profileDetails.languages.length > 0 ? (
              <ul className="languages-list">
                {profileDetails.languages.map((language, index) => (
                  <li key={index} className="language-item">{language}</li>
                ))}
              </ul>
            ) : <p>No languages listed.</p>}
          </section>
          <section className="profile-section">
            <div className="section-header">
              <MoreHorizIcon className="section-icon" />
              <h2>Additional Info</h2>
            </div>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Location Preferences:</strong> {locationPreferences}</p>
            <p><strong>Expected Salary:</strong> {expectedSalary}</p>
            <p><strong>Job Type:</strong> {jobType}</p>
            <p><strong>Job Title:</strong> {jobTitle}</p>
            {resume && <p><a href={resume} className="resume-link" target="_blank" rel="noopener noreferrer">View Resume</a></p>}
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
