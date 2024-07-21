import React from 'react';
import '../CSS/newJobCard.css';

const Jobs = ({ job }) => {
    return (
        <div className="new-job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-description">{job.description}</p>
            <p className="job-salary"><strong>Salary:</strong> {job.salary}</p>
            <p className="job-location"><strong>Location:</strong> {job.location}</p>
            <button className="edit-button">Edit</button>
        </div>
    );
};

export default Jobs;
