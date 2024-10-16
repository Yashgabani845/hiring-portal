import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import profilepic from "../assests/profile.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../CSS/profile.css";
import {
  FaStar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [appError, setAppError] = useState(null);
  const [profileimage, setProfileImage] = useState(profilepic);
  const [imageFile, setImageFile] = useState(null);
  const [mail, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (email) {
          // Fetch user profile
          const response = await fetch(
            `http://localhost:5000/api/users/profile?email=${encodeURIComponent(
              email
            )}`
          );
          if (!response.ok) throw new Error("Failed to fetch user profile");
          const userData = await response.json();
          setUser(userData);

          // Fetch applications
          const applicantId = userData._id; // Assuming applicantId is part of user data
          const appsResponse = await fetch(
            `http://localhost:5000/api/applicationss/${applicantId}`
          );
          if (!appsResponse.ok) throw new Error("Failed to fetch applications");
          const appsData = await appsResponse.json();
          setApplications(appsData);

          setLoading(false);
          setAppLoading(false);
        } else {
          setError("No email found in localStorage");
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

  // Retrieve email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("UserEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file)); // Preview the image
    setImageFile(file);
  };

  const handleSaveImage = async () => {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    // Prepare the image data for upload
    const formData = new FormData();
    formData.append("image", imageFile); // Attach the file to FormData

    try {
      const response = await fetch(
        `http://localhost:5000/api/edit-image/${email}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json(); // Parse the response
        toast.success("Image saved successfully!");
      } else {
        const errorResponse = await response.json();
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/signin");
  };

  const handleEdit = () => {
    navigate(`/editProfile`);
  }

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found</p>;

  const {
    name,
    email,
    profileDetails,
    location,
    locationPreferences,
    expectedSalary,
    jobType,
    jobTitle,
    resume,
    role,
  } = user;

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="profile-container">
        {/* Left side: Profile image, work info, skills */}
        <div className="profile-left">
          <div className="profile-card">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={profileimage} alt="Profile" className="profile-pic" />
              <div style={{ display: "flex", gap: "1rem" }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Button>
                <Button
                  className="Save-btn"
                  style={{ backgroundColor: "#007bff", height: "37px" }}
                  onClick={handleSaveImage} // Call save function on click
                >
                  Save
                </Button>
              </div>
            </div>

            <h1>{name}</h1>
            <div className="profile-role-location">
              <p className="profile-email">{email}</p>
              <p className="profile-location">
                <FaMapMarkerAlt /> {profileDetails.address}
              </p>
            </div>
            <div className="profile-role-location">
              {role === "owner" && (
                <button
                  className="contact-btn"
                  onClick={() => navigate("/owner")}
                >
                  Manage Job
                </button>
              )}
              <button className="logout-btn" onClick={handleEdit}>
                Edit Profile
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {(!profileDetails.pastJobs || profileDetails.pastJobs.length === 0) &&
            profileDetails.experience &&
            profileDetails.experience.length > 0 && (
              <section className="profile-section">
                <div className="section-header">
                  <WorkIcon className="section-icon" />
                  <h2>Experience</h2>
                </div>
                <ul className="experience-list">
                  {profileDetails.experience.map((exp, index) => (
                    <li key={index} className="experience-item">
                      <p>
                        <strong>Company:</strong> {exp.company}
                      </p>
                      <p>
                        <strong>Role:</strong> {exp.role}
                      </p>
                      <p>
                        <strong>Duration:</strong> {exp.duration}
                      </p>
                      <p>
                        <strong>Details:</strong> {exp.details}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          {profileDetails.pastJobs && profileDetails.pastJobs.length > 0 && (
            <div className="work-info">
              <div className="exp">
                <WorkIcon className="section-icon" />
                <h2>Past Jobs</h2>
              </div>
              <ul className="experience-list">
                {profileDetails.pastJobs.map((job, index) => (
                  <li
                    key={index}
                    className="experience-item"
                    style={{ listStyle: "none" }}
                  >
                    <p>
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p>
                      <strong>Role:</strong> {job.role}
                    </p>
                    <p>
                      <strong>Duration:</strong> {job.duration}
                    </p>
                    <p>
                      <strong>Details:</strong> {job.details}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="skills-info">
            <h2>
              <SettingsIcon className="section-icon" />
              Skills
            </h2>
            {profileDetails.skills.length > 0 ? (
              <ul className="skills-list">
                {profileDetails.skills.map((skill, index) => (
                  <li key={index} className="skill-item">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}
          </div>
        </div>

        {/* Right side: Contact details and about */}
        <div className="profile-right">
          {/* top */}
          <div>
            {/* Education Section */}
            <section className="profile-section education-section">
              <div className="section-header">
                <DescriptionIcon className="section-icon" />
                <h2>Education</h2>
              </div>
              {profileDetails.education ? (
                <div className="education-info">
                  <div className="info-item">
                    <strong>Degree:</strong>{" "}
                    <span>{profileDetails.education.degree}</span>
                  </div>
                  <div className="info-item">
                    <strong>University:</strong>{" "}
                    <span>{profileDetails.education.university}</span>
                  </div>
                  <div className="info-item">
                    <strong>CGPA:</strong>{" "}
                    <span>{profileDetails.education.cgpa}</span>
                  </div>
                </div>
              ) : (
                <p className="no-info">No education details available.</p>
              )}
            </section>

            {/* Languages Section */}
            <section className="profile-section languages-section">
              <div className="section-header">
                <ContactMailIcon className="section-icon" />
                <h2>Languages</h2>
              </div>
              {profileDetails.languages.length > 0 ? (
                <ul className="languages-list">
                  {profileDetails.languages.map((language, index) => (
                    <li key={index} className="language-item">
                      {language}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-info">No languages listed.</p>
              )}
            </section>
          </div>

          {/* bottom */}
          <div>
            <section className="profile-section additional-info-section">
              <div className="section-header">
                <MoreHorizIcon className="section-icon" />
                <h2>Additional Info</h2>
              </div>
              <div className="additional-info-content">
                <div className="info-item">
                  <strong>Location:</strong> <span>{location}</span>
                </div>
                <div className="info-item">
                  <strong>Location Preferences:</strong>{" "}
                  <span>{locationPreferences}</span>
                </div>
                <div className="info-item">
                  <strong>Expected Salary:</strong>{" "}
                  <span>{expectedSalary}</span>
                </div>
                <div className="info-item">
                  <strong>Job Type:</strong> <span>{jobType}</span>
                </div>
                <div className="info-item">
                  <strong>Job Title:</strong> <span>{jobTitle}</span>
                </div>
                {resume && (
                  <div className="info-item resume-link-wrapper">
                    <a
                      href={resume}
                      className="resume-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </div>
                )}
              </div>

              {applications.length > 0 && (
                <section className="applications-section">
                  <div className="section-header">
                    <h2>Applications</h2>
                  </div>
                  {appLoading ? (
                    <p>Loading applications...</p>
                  ) : appError ? (
                    <p>Error: {appError}</p>
                  ) : (
                    <ul className="applications-list">
                      {applications.map((app) => (
                        <li key={app._id} className="application-item">
                          <p>
                            <strong>Job Title:</strong> {app.jobId.title}
                          </p>
                          <p>
                            <strong>Resume:</strong>{" "}
                            <a
                              href={app.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
