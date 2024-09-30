import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import '../CSS/shortlist.css';

const Shortlist = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [assessments, setAssessments] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [emailContent, setEmailContent] = useState('');
    const [assessmentDetails, setAssessmentDetails] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/applications/${jobId}`);
                if (!response.ok) throw new Error('Network response was not ok');
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
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAssessments(data);
        } catch (error) {
            console.error('Error fetching assessments:', error);
        }
    };

    const fetchAssessmentDetails = async (assessmentId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/assessmen/${assessmentId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAssessmentDetails(data);
        } catch (error) {
            console.error('Error fetching assessment details:', error);
        }
    };

    const handleRoundSelect = () => {
        setShowModal(true);
        setModalType('round');
        fetchAssessments();
    };

    const handleAssessmentSelect = async (assessmentId) => {
        setSelectedAssessment(assessmentId);
        if (assessmentId) {
            await fetchAssessmentDetails(assessmentId);
        }
    };

   
    const handleAssessmentSubmit = async () => {
        if (selectedAssessment) {
            try {
                await fetch('http://localhost:5000/api/assessments/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ jobId, assessmentId: selectedAssessment }),
                });
                console.log(`Assessment emails sent for assessment ${selectedAssessment}`);
                toast.success('Assessment emails sent successfully!');
            } catch (error) {
                console.error('Error sending assessment emails:', error);
                toast.error('Failed to send assessment emails.');
            }
            setShowModal(false);
        }
    };
    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setModalType('view');
        setShowModal(true);
    };

    const handleHireApplicant = (application) => {
        setSelectedApplication(application);
        setModalType('hire');
        setShowModal(true);
    };

    const handleRejectApplicant = (application) => {
        setSelectedApplication(application);
        setModalType('reject');
        setShowModal(true);
    };

    const handleRejectSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/applications/${selectedApplication._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete the application');
            setApplications(applications.filter(app => app._id !== selectedApplication._id));
            setShowModal(false);
            console.log('Application rejected and deleted successfully');
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    const handleHireSubmit = async () => {
        console.log(`Hiring ${selectedApplication.applicantId.name} with email content: ${emailContent}`);
        setShowModal(false);
    };

    if (loading) return <p>Loading applications...</p>;

    if (applications.length === 0) return <p>No applications found for this job.</p>;

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

                        <div className="applicant-actions">
                            <button onClick={() => handleViewDetails(application)}>
                                <FaEye /> View
                            </button>
                            <button onClick={() => handleHireApplicant(application)}>
                                <FaCheck /> Hire
                            </button>
                            <button onClick={() => handleRejectApplicant(application)}>
                                <FaTimes /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} contentLabel="Applicant Details">
                {modalType === 'view' && selectedApplication && (
                    <div>
                        <h2>{selectedApplication.applicantId.name}'s Details</h2>
                        <p>Email: {selectedApplication.applicantId.email}</p>
                        <p>Mobile: {selectedApplication.mobileNumber}</p>
                        <p>Institute: {selectedApplication.instituteName}</p>
                        <p>Course: {selectedApplication.course} ({selectedApplication.courseSpecialization})</p>
                        <p>Graduating Year: {selectedApplication.graduatingYear}</p>
                        <p>Resume: <a href={selectedApplication.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                        <button className="submit-button" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                )}

                {modalType === 'hire' && (
                    <div>
                        <h2>Hire {selectedApplication.applicantId.name}</h2>
                        <textarea
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            placeholder="Enter email content..."
                        />
                        <button className="submit-button" onClick={handleHireSubmit}>Send Offer</button>
                    </div>
                )}

                {modalType === 'reject' && (
                    <div>
                        <h2>Reject {selectedApplication.applicantId.name}</h2>
                        <textarea
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            placeholder="Enter rejection email content..."
                        />
                        <button className="submit-button" onClick={handleRejectSubmit}>Send Rejection</button>
                    </div>
                )}

                {modalType === 'round' && (
                    <div>
                        <h2>Select Assessment Round</h2>
                        <div className="assessment-options">
                            {assessments.map((assessment) => (
                                <div 
                                    key={assessment._id} 
                                    className={`assessment-option ${selectedAssessment === assessment._id ? 'selected' : ''}`} 
                                    onClick={() => handleAssessmentSelect(assessment._id)}
                                >
                                    <input 
                                        type="radio" 
                                        id={assessment._id} 
                                        name="assessment" 
                                        value={assessment._id} 
                                        checked={selectedAssessment === assessment._id} 
                                        onChange={() => handleAssessmentSelect(assessment._id)} 
                                    />
                                    <div className="assessment-info">
                                        <p><strong>Max Marks:</strong> {assessment.maxMarks}</p>
                                        <p><strong>Start Time:</strong> {new Date(assessment.startTime).toLocaleString()}</p>
                                        <p><strong>End Time:</strong> {new Date(assessment.endTime).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {assessmentDetails && (
                            <div className="assessment-details">
                                <h3>Assessment Details:</h3>
                                <p><strong>Max Marks:</strong> {assessmentDetails.maxMarks}</p>
                                <p><strong>Start Time:</strong> {new Date(assessmentDetails.startTime).toLocaleString()}</p>
                                <p><strong>End Time:</strong> {new Date(assessmentDetails.endTime).toLocaleString()}</p>
                                <h4>Questions:</h4>
                                {assessmentDetails.questions.map((question, index) => (
                                    <div key={index} className="question">
                                        <p><strong>Q{index + 1}:</strong> {question.questionText}</p>
                                        {question.type === 'coding' && (
                                            <div className="coding-question">
                                                <p><strong>Problem:</strong> {question.codingQuestion.problemDescription}</p>
                                                <p><strong>Constraints:</strong> {question.codingQuestion.constraints.join(', ')}</p>
                                                <p><strong>Examples:</strong></p>
                                                {question.codingQuestion.examples.map((example, i) => (
                                                    <div key={i}>
                                                        <p><strong>Input:</strong> {example.input}</p>
                                                        <p><strong>Output:</strong> {example.output}</p>
                                                        <p><strong>Explanation:</strong> {example.explanation}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
<div className="tooltip-container">
  <button className="submit-button" onClick={handleAssessmentSubmit}>Submit</button>
  <span className="tooltip-text">Clicking this button will send an assessment link to all candidates.</span>
</div>
                    </div>
                )}
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default Shortlist;
