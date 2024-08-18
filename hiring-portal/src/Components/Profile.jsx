import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import profilepic from '../profile.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../CSS/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [appError, setAppError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (email) {
          // Fetch user profile
          const response = await fetch(`https://hirebackend-1.onrender.com/api/users/profile?email=${encodeURIComponent(email)}`);
          if (!response.ok) throw new Error('Failed to fetch user profile');
          const userData = await response.json();
          setUser(userData);

          // Fetch applications
          const applicantId = userData._id; // Assuming applicantId is part of user data
          const appsResponse = await fetch(`https://hirebackend-1.onrender.com/api/applicationss/${applicantId}`);
          if (!appsResponse.ok) throw new Error('Failed to fetch applications');
          const appsData = await appsResponse.json();
          setApplications(appsData);

          setLoading(false);
          setAppLoading(false);
        } else {
          setError('No email found in localStorage');
          setLoading(false);
          setAppLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setAppLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  if (loading) return <p>Loading profile...</p>;
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

          {profileDetails.pastJobs && profileDetails.pastJobs.length > 0 && (
            <section className="profile-section">
              <div className="section-header">
                <WorkIcon className="section-icon" />
                <h2>Past Jobs</h2>
              </div>
              <ul className="experience-list">
                {profileDetails.pastJobs.map((job, index) => (
                  <li key={index} className="experience-item">
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Role:</strong> {job.role}</p>
                    <p><strong>Duration:</strong> {job.duration}</p>
                    <p><strong>Details:</strong> {job.details}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(!profileDetails.pastJobs || profileDetails.pastJobs.length === 0) && profileDetails.experience && profileDetails.experience.length > 0 && (
            <section className="profile-section">
              <div className="section-header">
                <WorkIcon className="section-icon" />
                <h2>Experience</h2>
              </div>
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
            </section>
          )}

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

          {applications.length > 0 && (
            <section className="profile-section">
              <div className="section-header">
                <h2>Applications</h2>
              </div>
              {appLoading ? <p>Loading applications...</p> : appError ? <p>Error: {appError}</p> : (
                <ul className="applications-list">
                  {applications.map(app => (
                    <li key={app._id} className="application-item">
                      <p><strong>Job Title:</strong> {app.jobId.title}</p>
                      <p><strong>Resume:</strong> <a href={app.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
