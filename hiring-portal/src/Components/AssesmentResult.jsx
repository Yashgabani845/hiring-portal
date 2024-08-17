import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../CSS/assessmentResults.css"
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
    <div>
      <h2>Assessment Results for Job ID: {jobId}</h2>
      {assessments.length > 0 ? (
        <ul>
          {assessments.map(assessment => (
            <li key={assessment._id}>
              <div>
                <h3>{assessment.questions[0]?.codingQuestion?.title}</h3>
                <p>Max Marks: {assessment.maxMarks}</p>
                <p>Start Time: {new Date(assessment.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(assessment.endTime).toLocaleString()}</p>
                <button onClick={() => viewResultHandler(assessment._id)}>View Result</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No assessments found for this job.</p>
      )}
    </div>
  );
};

export default AssessmentResults;
