import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import profilepic from "../assests/profile.jpg";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import { IoIosInformationCircle } from "react-icons/io";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


import "../CSS/profile.css";
import {
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Box, Modal } from "@mui/material";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};



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
  const [openLogoutModal, setOpenLogoutModal] = useState(false); // Modal state
  const [Addskill, SetAddSkill] = useState(false);
  const navigate = useNavigate();
  const [skilltoadd, Setskilltoadd] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (email) {
          // Fetch user profile
          const response = await fetch(
            `http://localhost:5000/api/users/profile/${
              email
            }`
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

  const handleOpenLogoutModal = () => {
    setOpenLogoutModal(true);
  };

  // Function to close the modal without logging out
  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  // Confirm logout and remove local storage data
  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/signin");
    setOpenLogoutModal(false); // Close modal after logout
  };
  async function addSkill(skill) {
    try {
      const email = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:5000/api/users/addskill", {
        // Adjust this URL to match your backend route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, skill }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        Setskilltoadd("");
      } else {
        console.error("Error:", data.message);
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  }

  if (loading)
    return (
      <div className="skeletonDiv">
        <div className="skeleton_Child">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {" "}
            <Skeleton variant="rectangular" width={410} height={400} />
            <Skeleton variant="rectangular" width={410} height={200} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {" "}
            <Skeleton variant="rectangular" width={800} height={200} />
            <Skeleton variant="rectangular" width={800} height={165} />
            <Skeleton variant="rectangular" width={800} height={150} />
          </div>
        </div>
      </div>
    );

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
          <div className="profile-card" data-aos="fade-right" data-aos-delay="100">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={profileimage} alt="Profile" className="profile-pic" />
              <div
                style={{ display: "flex", gap: "1rem" }}
                className="buttondiv"
              >
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
              <button className="logout-btn" onClick={handleOpenLogoutModal}>

                Logout
              </button>
            </div>
          </div>
          {/* logout modal */}
          <Modal
            open={openLogoutModal}
            onClose={handleCloseLogoutModal}
            aria-labelledby="logout-confirmation-modal"
            aria-describedby="confirm-logout-action"
          >
            <Box sx={modalStyle} data-aos="fade-right" data-aos-delay="200">
              <p style={{ fontWeight: "600" }}>
                Are you sure you want to log out?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmLogout}
                >
                  Yes, Logout
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseLogoutModal}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>

          {(!profileDetails.pastJobs || profileDetails.pastJobs.length === 0) &&
            profileDetails.experience &&
            profileDetails.experience.length > 0 && (
              <section className="profile-section" data-aos="fade-right" data-aos-delay="200">
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
            <div className="work-info" data-aos="fade-right" data-aos-delay="200">
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

          <div className="skills-info" data-aos="fade-right" data-aos-delay="300">
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "1rem",
              }}
            >
              {" "}
              <Button
                className="Save-btn"
                style={{
                  backgroundColor: "#007bff",
                  height: "37px",
                  color: "white",
                  marginTop: "1rem",
                }}
                onClick={() => {
                  SetAddSkill(true);
                }}
              >
                Add skill
              </Button>
              {Addskill ? (
                <div
                  style={{ display: "flex", gap: "2rem", alignItems: "center" }}
                >
                  <input
                    type="text"
                    style={{ height: "37px" }}
                    placeholder="Add skill"
                    value={skilltoadd}
                    onChange={(e) => {
                      Setskilltoadd(e.target.value);
                    }}
                  ></input>
                  <Button
                    className="Save-btn"
                    style={{
                      backgroundColor: "#007bff",
                      height: "37px",
                      color: "white",
                    }}
                    onClick={() => {
                      addSkill(skilltoadd);
                    }}
                  >
                    Save
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right side: Contact details and about */}
        <div className="profile-right">
          {/* top */}
          <div>
            {/* Education Section */}
            <section className="profile-section education-section" data-aos="fade-left" data-aos-delay="100">
              <div className="section-header">
                <DescriptionIcon className="section-icon" />
                <h2>Education</h2>
              </div>
              {profileDetails.education ? (
                <div className="education-info">
                  <div className="info-item">
                    <strong>Degree:</strong>{" "}
                    <span className="dataspan">
                      {profileDetails.education.degree}
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>University:</strong>{" "}
                    <span className="dataspan">
                      {profileDetails.education.university}
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>CGPA:</strong>{" "}
                    <span className="dataspan">
                      {" "}
                      {profileDetails.education.cgpa}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="no-info">No education details available.</p>
              )}
            </section>

            {/* Languages Section */}
            <section className="profile-section languages-section" data-aos="fade-left" data-aos-delay="200">
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
            <section className="profile-section additional-info-section" data-aos="fade-left" data-aos-delay="300">
              <div className="section-header">
                <IoIosInformationCircle
                  className="section-icon"
                  style={{ fontSize: "25px" }}
                />
                <h2>Additional Info</h2>
              </div>
              <div className="additional-info-content">
                <div className="info-item">
                  <strong>Location:</strong>{" "}
                  <span className="dataspan">{location}</span>
                </div>
                <div className="info-item">
                  <strong>Location Preferences:</strong>{" "}
                  <span className="dataspan">{locationPreferences}</span>
                </div>
                <div className="info-item">
                  <strong>Expected Salary:</strong>{" "}
                  <span className="dataspan">{expectedSalary}</span>
                </div>
                <div className="info-item">
                  <strong>Job Type:</strong>{" "}
                  <span className="dataspan">{jobType}</span>
                </div>
                <div className="info-item">
                  <strong>Job Title:</strong>{" "}
                  <span className="dataspan">{jobTitle}</span>
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
