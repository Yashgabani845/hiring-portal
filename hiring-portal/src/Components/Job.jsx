import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaDollarSign,
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaBuilding,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaList,
  FaLanguage,
  FaTag,
  FaNetworkWired,
  FaHistory,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaCheck
} from "react-icons/fa";
import "../CSS/job.css";
import comlogo from "../assests/company.png";
import Footer from "./Footer";
import { ClipLoader } from "react-spinners";

const Job = () => {
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jobs/${id}`
        );
        setJobDetails(response.data);

        if (response.data.postedBy) {
          const companyResponse = await axios.get(
            `http://localhost:5000/api/companies/${response.data.postedBy}`
          );
          setCompanyDetails(companyResponse.data);
        }
      } catch (error) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/job`);
        const jobsWithCompanyLogos = await Promise.all(
          response.data.map(async (job) => {
            try {
              if (job.type === "native") {
                const companyResponse = await axios.get(
                  `http://localhost:5000/api/companies/${job.postedBy}`
                );
                return {
                  ...job,
                  comlogo: companyResponse.data.logo,
                  companyName: companyResponse.data.name
                };
              } else {
                return { ...job };
              }
            } catch (err) {
              return job;
            }
          })
        );

        const validJobs = jobsWithCompanyLogos.filter((job) => {
          return calculateTimeLeft(job.applicationDeadline) !== "00:00:00" && job._id !== id;
        });

        const randomJobs = validJobs
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRecommendedJobs(randomJobs);
      } catch (error) {
        setError("Failed to fetch recommended jobs.");
      }
    };

    fetchJobDetails();
    fetchRecommendedJobs();

    // Set up timer for deadline
    const timer = setInterval(() => {
      if (jobDetails?.applicationDeadline) {
        setTimeLeft(calculateTimeLeft(jobDetails.applicationDeadline));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [id, jobDetails?.applicationDeadline]);

  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeLeft = deadlineDate - now;

    if (timeLeft <= 0) return "Expired";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="job-loader-container">
        <ClipLoader size={50} color="#4e9ff5" />
        <div className="job-loader-text">
          <h3>Loading job details...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="job-error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            className="job-error-button"
            onClick={() => navigate("/jobs")}
          >
            Back to Jobs
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="job-page">
        <div className="job-breadcrumb">
          <span onClick={() => navigate("/jobcard")}>Jobs</span> / <span>{jobDetails.title}</span>
        </div>

        <div className="job-container">
          <div className="job-main-content">
            <div className="job-header">
              <div className="job-header-content">
                <div className="job-logo-container">
                  <img 
                    src={jobDetails.type === "native" ? (companyDetails?.logo || comlogo) : (jobDetails.comlogo || comlogo)} 
                    alt="Company Logo" 
                    className="job-company-logo" 
                  />
                </div>
                <div className="job-title-container">
                  <h1>{jobDetails.title}</h1>
                  <div className="job-subtitle">
                    {jobDetails.type === "native" && companyDetails ? (
                      <span className="job-company-name">{companyDetails.name}</span>
                    ) : (
                      <span className="job-external-label">External Job</span>
                    )}
                    <span className="job-location"><FaMapMarkerAlt /> {jobDetails.workLocation}</span>
                    <span className={`job-type-badge ${jobDetails.remote ? "remote" : ""}`}>
                      {jobDetails.remote ? "Remote" : "On-site"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="job-apply-section">
                <div className="job-deadline-timer">
                  <FaRegClock /> Application closes in: 
                  <div className="job-countdown">{calculateTimeLeft(jobDetails.applicationDeadline)}</div>
                </div>
                <button
                  className="job-apply-button"
                  onClick={() => {
                    if (jobDetails.type === "external") {
                      window.open(jobDetails.link, "_blank");
                    } else {
                      navigate("/application", {
                        state: { jobId: jobDetails._id, emailcurrent: userEmail },
                      });
                    }
                  }}
                >
                  {jobDetails.type === "external" ? "Apply on Company Site" : "Apply Now"}
                </button>
              </div>
            </div>

            <div className="job-details-container">
              <div className="job-highlights-grid">
                <div className="job-highlight-card">
                  <div className="job-highlight-icon">
                    <FaBriefcase />
                  </div>
                  <div className="job-highlight-content">
                    <h4>Job Type</h4>
                    <p>{jobDetails.employmentType}</p>
                  </div>
                </div>
                <div className="job-highlight-card">
                  <div className="job-highlight-icon">
                    <FaUsers />
                  </div>
                  <div className="job-highlight-content">
                    <h4>Experience</h4>
                    <p>{jobDetails.experienceLevel}</p>
                  </div>
                </div>
                <div className="job-highlight-card">
                  <div className="job-highlight-icon">
                    <FaDollarSign />
                  </div>
                  <div className="job-highlight-content">
                    <h4>Salary Range</h4>
                    <p>${jobDetails.salaryRange?.min?.toLocaleString()} - ${jobDetails.salaryRange?.max?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="job-highlight-card">
                  <div className="job-highlight-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="job-highlight-content">
                    <h4>Deadline</h4>
                    <p>{formatDate(jobDetails.applicationDeadline)}</p>
                  </div>
                </div>
              </div>

              <div className="job-detail-sections">
                <div className="job-detail-section">
                  <h2><FaList /> Job Description</h2>
                  <div className="job-description">
                    <p>{jobDetails.description}</p>
                  </div>
                </div>

                {jobDetails.jobResponsibilities && jobDetails.jobResponsibilities.length > 0 && (
                  <div className="job-detail-section">
                    <h2><FaCheck /> Responsibilities</h2>
                    <ul className="job-list">
                      {jobDetails.jobResponsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {jobDetails.requirements && jobDetails.requirements.length > 0 && (
                  <div className="job-detail-section">
                    <h2><FaCheck /> Requirements</h2>
                    <ul className="job-list">
                      {jobDetails.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {jobDetails.languagesRequired && jobDetails.languagesRequired.length > 0 && (
                  <div className="job-detail-section">
                    <h2><FaLanguage /> Required Languages</h2>
                    <div className="job-tags">
                      {jobDetails.languagesRequired.map((language, index) => (
                        <span key={index} className="job-tag">{language}</span>
                      ))}
                    </div>
                  </div>
                )}

                {jobDetails.keywords && jobDetails.keywords.length > 0 && (
                  <div className="job-detail-section">
                    <h2><FaTag /> Keywords</h2>
                    <div className="job-tags">
                      {jobDetails.keywords.map((keyword, index) => (
                        <span key={index} className="job-tag">{keyword}</span>
                      ))}
                    </div>
                  </div>
                )}

                {jobDetails.shift && jobDetails.shift.length > 0 && (
                  <div className="job-detail-section">
                    <h2><FaRegClock /> Work Schedule</h2>
                    <p>{jobDetails.shift.join(", ")}</p>
                  </div>
                )}

                {jobDetails.companyCulture && (
                  <div className="job-detail-section">
                    <h2><FaNetworkWired /> Company Culture</h2>
                    <p>{jobDetails.companyCulture}</p>
                  </div>
                )}
              </div>

              {jobDetails.type === "native" && companyDetails && (
                <div className="job-company-details">
                  <h2><FaBuilding /> About the Company</h2>
                  <div className="job-company-card">
                    <div className="job-company-header">
                      <img 
                        src={companyDetails.logo || comlogo} 
                        alt={`${companyDetails.name} logo`}
                        className="job-company-logo-sm" 
                      />
                      <div>
                        <h3>{companyDetails.name}</h3>
                        <p className="job-company-industry">{companyDetails.industry}</p>
                      </div>
                    </div>
                    <div className="job-company-info">
                      <p>{companyDetails.description}</p>
                      
                      <div className="job-company-facts">
                        <div className="job-company-fact">
                          <FaMapMarkerAlt /> 
                          <span>{companyDetails.location}</span>
                        </div>
                        {companyDetails.establishedYear && (
                          <div className="job-company-fact">
                            <FaHistory /> 
                            <span>Est. {companyDetails.establishedYear}</span>
                          </div>
                        )}
                        {companyDetails.employeesCount && (
                          <div className="job-company-fact">
                            <FaUsers /> 
                            <span>{companyDetails.employeesCount} employees</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="job-company-contact">
                        {companyDetails.website && (
                          <a href={companyDetails.website} target="_blank" rel="noopener noreferrer" className="job-company-link">
                            <FaGlobe /> Website
                          </a>
                        )}
                        <div className="job-company-contact-info">
                          <span><FaEnvelope /> {companyDetails.email}</span>
                          <span><FaPhone /> {companyDetails.phone}</span>
                        </div>
                      </div>
                      
                      {companyDetails.socialMediaLinks && (
                        <div className="job-company-social">
                          {companyDetails.socialMediaLinks.linkedin && (
                            <a href={companyDetails.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer" className="job-social-icon">
                              <FaLinkedin />
                            </a>
                          )}
                          {companyDetails.socialMediaLinks.facebook && (
                            <a href={companyDetails.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="job-social-icon">
                              <FaFacebook />
                            </a>
                          )}
                          {companyDetails.socialMediaLinks.twitter && (
                            <a href={companyDetails.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="job-social-icon">
                              <FaTwitter />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="job-sidebar">
            <div className="job-recommendations">
              <h2>Similar Jobs</h2>
              <div className="job-recommendations-list">
                {recommendedJobs.length > 0 ? (
                  recommendedJobs.map((job, index) => (
                    <div key={index} className="job-recommendation-card">
                      <div className="job-recommendation-logo">
                        <img src={job.comlogo || comlogo} alt="Company Logo" />
                      </div>
                      <div className="job-recommendation-content">
                        <h3>{job.title}</h3>
                        {job.companyName && <p className="job-recommendation-company">{job.companyName}</p>}
                        <div className="job-recommendation-details">
                          <span><FaMapMarkerAlt /> {job.workLocation}</span>
                          <span><FaDollarSign /> ${job.salaryRange?.min?.toLocaleString()} - ${job.salaryRange?.max?.toLocaleString()}</span>
                        </div>
                        <div className="job-recommendation-deadline">
                          <FaRegClock /> {calculateTimeLeft(job.applicationDeadline)}
                        </div>
                        <button
                          className="job-recommendation-button"
                          onClick={() => navigate(`/job/${job._id}`)}
                        >
                          View Job
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="job-no-recommendations">
                    <p>No similar jobs found at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Job;