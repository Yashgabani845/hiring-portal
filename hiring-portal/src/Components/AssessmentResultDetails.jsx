import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../CSS/assessmentResults.css";

const AssessmentResults = () => {
  const { jobId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/assessments/${jobId}`);
        const data = await response.json();
        setAssessments(data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, [jobId]);

  const viewResultHandler = (assessmentId) => {
    navigate(`/assessment-results/result/${assessmentId}`);
  };

  return (
    <div className="assessment-results-container">
      <h2 className="title">Assessment Results</h2>
      {assessments.length > 0 ? (
        <div className="results-list">
          {assessments.map(assessment => (
            <div key={assessment._id} className="result-card">
              <div className="result-details">
                <h3>{assessment.questions[0]?.codingQuestion?.title}</h3>
                <p><strong>Max Marks:</strong> {assessment.maxMarks}</p>
                <p><strong>Start Time:</strong> {new Date(assessment.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(assessment.endTime).toLocaleString()}</p>
              </div>
              <button className="view-result-btn" onClick={() => viewResultHandler(assessment._id)}>
                View Result
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No assessments found for this job.</p>
      )}
    </div>
  );
};

export default AssessmentResults;
