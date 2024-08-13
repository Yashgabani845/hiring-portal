import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal'; 
import '../CSS/shortlist.css';

const Shortlist = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [assessments, setAssessments] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);

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

    const fetchAssessments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/assessments/${jobId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAssessments(data);
        } catch (error) {
            console.error('Error fetching assessments:', error);
        }
    };

    const handleRoundSelect = () => {
        setShowModal(true);
        fetchAssessments();
    };

    const handleAssessmentSubmit = () => {
        if (selectedAssessment) {
            console.log(`Selected Assessment for all applicants: ${selectedAssessment}`);
            setShowModal(false);
        }
    };

    if (loading) {
        return <p>Loading applications...</p>;
    }

    if (applications.length === 0) {
        return <p>No applications found for this job.</p>;
    }

    return (
        <div className="shortlist-container">
            <h1>Applicants</h1>
            <button className="global-round-button" onClick={handleRoundSelect}>Take a Round</button>

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
                    </div>
                ))}
            </div>

            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} contentLabel="Select Assessment">
                <h2>Select Assessment</h2>
                {assessments.length > 0 ? (
                    <div className="assessment-list">
                        {assessments.map((assessment) => (
                            <div key={assessment._id} className="assessment-item">
                                <input
                                    type="radio"
                                    value={assessment._id}
                                    checked={selectedAssessment === assessment._id}
                                    onChange={() => setSelectedAssessment(assessment._id)}
                                />
                                <label>
                                    <strong>Max Marks:</strong> {assessment.maxMarks}
                                    <br />
                                    <strong>Overall Time:</strong> {assessment.overallTime} minutes
                                    <br />
                                    <strong>Questions:</strong>
                                    <ul>
                                        {assessment.questions.map((question) => (
                                            <li key={question._id}>
                                                <strong>Type:</strong> {question.type}
                                                {question.type === 'coding' && (
                                                    <>
                                                        <br />
                                                        <strong>Title:</strong> {question.codingQuestion.title}
                                                        <br />
                                                        <strong>Description:</strong> {question.codingQuestion.problemDescription}
                                                        <br />
                                                        <strong>Constraints:</strong> {question.codingQuestion.constraints.join(', ')}
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No assessments available.</p>
                )}

                <button className="submit-button" onClick={handleAssessmentSubmit}>Submit</button>
            </Modal>
        </div>
    );
};

export default Shortlist;
