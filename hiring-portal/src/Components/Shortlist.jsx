import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/shortlist.css';

const Shortlist = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/applications/${jobId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId]);

    if (loading) {
        return <p>Loading applications...</p>;
    }

    if (applications.length === 0) {
        return <p>No applications found for this job.</p>;
    }

    return (
        <div className="shortlist-container">
            <h1>Applicants</h1>
            <div className="applicants-list">
                {applications.map((application) => (
                    <div key={application._id} className="applicant-card">
                        <h3>{application.applicantId.name}</h3>
                        <p>Email: {application.applicantId.email}</p>
                        <p>Mobile: {application.mobileNumber}</p>
                        <p>Institute: {application.instituteName}</p>
                        <p>Course: {application.course} ({application.courseSpecialization})</p>
                        <p>Graduating Year: {application.graduatingYear}</p>
                        <p>Resume: <a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                        <button className="shortlist-button">Shortlist</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shortlist;
