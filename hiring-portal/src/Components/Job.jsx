import React from "react";
import { useParams } from "react-router-dom";
import JobList from "./JobList"; // Component for recommendations
import "../CSS/job.css";

const Job = () => {
    const { id } = useParams();
    const jobDetails = {
        id: id,
        title: "UK Healthcare Recruiter (Freshers/Graduates can apply)",
        company: "Ims People Possible",
        location: "Ahmedabad, Gujarat",
        salary: "Up to ₹30,000 a month",
        type: "Full-time",
        shift: ["Day shift", "UK shift", "Monday to Friday"],
        benefits: ["Food provided", "Health insurance", "Provident Fund"],
        description: `
            Greetings for the day!
            IMS Group is urgently hiring for International Recruiters!!
            Kindly find below the job description!
            ...
        `
    };

    return (
        <div className="job-detail-page">
            <h1>{jobDetails.title}</h1>
            <p className="company">{jobDetails.company}</p>
            <p className="location">{jobDetails.location}</p>
            <p className="salary">{jobDetails.salary}</p>
            <button className="apply-btn">Apply Now</button>
            <div className="job-details">
                <h2>Job Details</h2>
                <p>Pay: {jobDetails.salary}</p>
                <p>Job Type: {jobDetails.type}</p>
                <p>Shift and Schedule: {jobDetails.shift.join(", ")}</p>
                <p>Location: {jobDetails.location}</p>
                <h3>Benefits</h3>
                <ul>
                    {jobDetails.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
                <h3>Full Job Description</h3>
                <p>{jobDetails.description}</p>
            </div>
            <div className="recommand">
            <JobList />
            </div>
        </div>
    );
};

export default Job;
