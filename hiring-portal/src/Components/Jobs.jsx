import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/newJobCard.module.css';

const Jobs = ({ job }) => {
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate(`/managejobs/${job._id}`);
    };

    return (
        <div className={styles.jobCard}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobSalary}><strong>Salary:</strong> {job.salaryRange.min}</p>
            <p className={styles.jobLocation}><strong>Location:</strong> {job.workLocation}</p>
            <button className={styles.editButton} onClick={handleEditClick}>Edit</button>
        </div>
    );
};

export default Jobs;
