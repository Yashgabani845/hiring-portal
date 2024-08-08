import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegClock, FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaUsers, FaEye, FaCalendarAlt } from "react-icons/fa";
import "../CSS/job.css"; 
import logo from "../logo.png"
import Navbar from "./Navbar";

const Job = () => {
    const navigate=useNavigate();
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState(null);
    const [recommendedJobs, setRecommendedJobs] = useState([]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJobDetails(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        const fetchRecommendedJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/job`);
                setRecommendedJobs(response.data);
            } catch (error) {
                console.error("Error fetching recommended jobs:", error);
            }
        };

        fetchJobDetails();
        fetchRecommendedJobs();
    }, [id]);
    const calculateTimeLeft = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const timeLeft = deadlineDate - now;

        if (timeLeft <= 0) return "00:00:00";

        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!jobDetails) return <p>Loading...</p>;

    return (
        <div className="job-page">
            <div className="job-container">
                <div className="recommendation-section">
                    <h2>Recommended Jobs</h2>
                    <div className="recommended-job-grid">
                        {recommendedJobs.map((job, index) => (
                            <div key={index} className="recommended-job-card">
                                <img src={logo} alt={`${job.title} logo`} className="job-logo" />
                                <div>
                                    <h3>{job.title}</h3>
                                    <p><FaRegClock /> Time Left: {calculateTimeLeft(job.applicationDeadline)}</p>
                                    <button 
                                        className="view-button"  
                                        onClick={() => navigate(`/job/${job._id}`)}  // Navigate to job details page
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="job-section">
                    <h1 className="job-title">{jobDetails.title}</h1>
                    <div className="job-detail-section">
                        <h2><FaBriefcase /> Job Type</h2>
                        <p>{jobDetails.employmentType}</p>
                    </div>
                    <div className="job-detail-section">
                        <h2><FaUsers /> Experience</h2>
                        <p>{jobDetails.experienceLevel}</p>
                    </div>
                    <div className="job-detail-section">
                        <h2><FaMapMarkerAlt /> Job Location</h2>
                        <p>{jobDetails.workLocation}</p>
                    </div>
                    <div className="job-detail-section">
                        <h2><FaDollarSign /> Salary</h2>
                        <p>{jobDetails.salaryRange.min} - {jobDetails.salaryRange.max}</p>
                    </div>
                    <div className="job-detail-section">
                        <h2><FaRegClock /> Work Details</h2>
                        <p>{jobDetails.shift ? jobDetails.shift.join(", ") : "N/A"}</p>
                    </div>
                    <div className="job-detail-section">
                        <h2><FaCalendarAlt /> Application Deadline</h2>
                        <p>{jobDetails.applicationDeadline}</p>
                    </div>
                    <div className="job-detail-section">
                        <h2>Job Description</h2>
                        <p>{jobDetails.description}</p>
                    </div>
                    <div className="job-impressions-section">
                        <div><FaEye /> Impressions: {jobDetails.impressions}</div>
                        <div><FaUsers /> Applied: {jobDetails.applied}</div>
                    </div>
                    <button className="apply-button">Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default Job;