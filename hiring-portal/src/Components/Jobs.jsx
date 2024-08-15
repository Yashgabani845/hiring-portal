import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/newJobCard.css';

const Jobs = ({ job }) => {
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate(`/managejobs/${job._id}`);
    };

    return (
        <div className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-salary"><strong>Salary:</strong> {job.salaryRange.min}</p>
            <p className="job-location"><strong>Location:</strong> {job.workLocation}</p>
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </div>
    );
};

export default Jobs;
