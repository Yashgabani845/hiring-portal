import React from "react";
import { useParams } from "react-router-dom";
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
        `,
        responsibilities: `
            - Sourcing candidates through various channels
            - Conducting interviews
            - Coordinating with clients
            - Maintaining candidate database
        `,
        requirements: `
            - Good communication skills
            - Bachelor's degree
            - Experience in recruitment is a plus
        `,
        skills: `
            - Communication
            - Time management
            - Organizational skills
        `
    };

    const recommendedJobs = [
        {
            id: 2,
            title: "Software Developer",
            company: "Tech Solutions",
            location: "Mumbai, Maharashtra",
            salary: "₹50,000 a month",
            type: "Full-time",
        },
        {
            id: 3,
            title: "Marketing Specialist",
            company: "Creative Minds",
            location: "Delhi, Delhi",
            salary: "₹40,000 a month",
            type: "Part-time",
        },
        {
            id: 4,
            title: "Graphic Designer",
            company: "Design Hub",
            location: "Bengaluru, Karnataka",
            salary: "₹35,000 a month",
            type: "Full-time",
        },
    ];

    return (
        <div className="job-page">
            <div className="job-container">
                <div className="recommended-jobs">
                    <h2>Recommended Jobs</h2>
                    {recommendedJobs.map((job) => (
                        <div key={job.id} className="recommended-job-card">
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                            <p>{job.salary}</p>
                            <p>{job.type}</p>
                        </div>
                    ))}
                </div>
                <div className="current-job">
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
                        <h3>Responsibilities</h3>
                        <p>{jobDetails.responsibilities}</p>
                        <h3>Requirements</h3>
                        <p>{jobDetails.requirements}</p>
                        <h3>Skills</h3>
                        <p>{jobDetails.skills}</p>
                        <h3>Benefits</h3>
                        <ul>
                            {jobDetails.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                        <h3>Full Job Description</h3>
                        <p>{jobDetails.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Job;
