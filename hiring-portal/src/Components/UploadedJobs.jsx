import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jobs from './Jobs';
import '../CSS/uploadedJobs.css';

const UploadedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        
        if (email) {
            axios.get(`http://localhost:5000/api/jobs`, {
                params: { email }
            })
            .then(response => {
                setJobs(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
        } else {
            setError('No email found in localStorage');
            setLoading(false);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (jobs.length === 0) return <p>No jobs found.</p>;

    return (
        <div className="uploaded-jobs-container">
            <h1>Uploaded Jobs</h1>
            <div className="jobs-list">
                {jobs.map(job => (
                    <Jobs key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default UploadedJobs;
