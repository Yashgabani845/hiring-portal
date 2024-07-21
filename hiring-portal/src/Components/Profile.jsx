import React, { useState, useEffect } from 'react';
import '../CSS/profile.css';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found</p>;

  const {
    name, email, profileDetails, location, locationPreferences, expectedSalary, jobType, jobTitle, resume
  } = user;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileDetails.avatar} alt="Avatar" className="profile-avatar" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-email">{email}</p>
      </div>
      <div className="profile-details">
        <section className="profile-section">
          <h2>Bio</h2>
          <p>{profileDetails.bio}</p>
        </section>
        <section className="profile-section">
          <h2>Education</h2>
          {profileDetails.education ? (
            <div className="education-info">
              <p><strong>Degree:</strong> {profileDetails.education.degree}</p>
              <p><strong>University:</strong> {profileDetails.education.university}</p>
              <p><strong>CGPA:</strong> {profileDetails.education.cgpa}</p>
            </div>
          ) : <p>No education details available.</p>}
        </section>
        <section className="profile-section">
          <h2>Experience</h2>
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
          <h2>Skills</h2>
          {profileDetails.skills.length > 0 ? (
            <ul className="skills-list">
              {profileDetails.skills.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          ) : <p>No skills listed.</p>}
        </section>
        <section className="profile-section">
          <h2>Address</h2>
          <p>{profileDetails.address}</p>
        </section>
        <section className="profile-section">
          <h2>Languages</h2>
          {profileDetails.languages.length > 0 ? (
            <ul className="languages-list">
              {profileDetails.languages.map((language, index) => (
                <li key={index} className="language-item">{language}</li>
              ))}
            </ul>
          ) : <p>No languages listed.</p>}
        </section>
        <section className="profile-section">
          <h2>Tech Stack</h2>
          <p>{profileDetails.techStack}</p>
        </section>
        <section className="profile-section">
          <h2>Additional Info</h2>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Location Preferences:</strong> {locationPreferences}</p>
          <p><strong>Expected Salary:</strong> {expectedSalary}</p>
          <p><strong>Job Type:</strong> {jobType}</p>
          <p><strong>Job Title:</strong> {jobTitle}</p>
          {resume && <p><a href={resume} className="resume-link" target="_blank" rel="noopener noreferrer">View Resume</a></p>}
        </section>
      </div>
    </div>
  );
};

export default Profile;
