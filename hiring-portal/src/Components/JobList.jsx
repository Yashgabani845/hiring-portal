import React from "react";
import { Link } from "react-router-dom";
import "../CSS/joblist.css";
import Jobcard from "./Jobcard";
import google from "../googlelogo.png"
const JobList = () => {
    const recommendedJobs = [
        {
            id: 1,
            title: "Software Engineer",
            company: "Google",
            location: "Bangalore, Karnataka",
            salary: "Up to ₹40,000 a month"
        },
        {
            id: 2,
            title: "Data Analyst",
            company: "Facebook",
            location: "Mumbai, Maharashtra",
            salary: "Up to ₹35,000 a month"
        },
        {
            id: 3,
            title: "Project Manager",
            company: "Amazon",
            location: "Hyderabad, Telangana",
            salary: "Up to ₹45,000 a month"
        }
    ];

    return (
        <div className="job-list">
            <h2>Recommended Jobs</h2>
            <ul>
                {recommendedJobs.map(job => (
                    <li key={job.id}>
                        <Link to={`/job/${job.id}`}>
                        <Jobcard comlogo={google}
                id={job.id}
                    key={job.id}
                    company={job.company}
                    rating={job.location}
                    reviews={job.salary}
                    />
                           
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
