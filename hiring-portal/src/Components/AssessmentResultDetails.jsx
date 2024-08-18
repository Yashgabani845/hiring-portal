import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/ass.css'; 

const AssessmentResultDetail = () => {
  const { assessmentId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewDetails, setViewDetails] = useState({}); 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/results/${assessmentId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setResults(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [assessmentId]);

  if (loading) {
    return <p>Loading assessment details...</p>;
  }

  if (error) {
    return <p>Error fetching result: {error}</p>;
  }

  if (results.length === 0) {
    return <p>There is no Results till now </p>;
  }

  const handleViewDetails = (index) => {
    setViewDetails(prevState => ({
      ...prevState,
      [index]: !prevState[index] 
    }));
  };

  const handleHire = async (applicantId, jobId) => {

    try {
      const response = await fetch('http://localhost:5000/api/hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicantId, jobId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to hire the applicant');
      }
  
      alert('Applicant hired and email sent');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  
  const handleReject = async (applicantId, jobId) => {
    try {
      const response = await fetch('http://localhost:5000/api/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicantId, jobId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to reject the applicant');
      }
  
      alert('Applicant rejected and email sent');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="assessment-detail-container">
      <h2>Assessment Results</h2>
      {results.map((result, index) => (
        
        <div key={index} className="result-card">
          <h3>Application {index + 1}</h3>
          <p><strong>Applicant Name:</strong> {result.applicantId?.name || 'N/A'}</p>
          <p><strong>Applicant Email:</strong> {result.applicantId?.email || 'N/A'}</p>
          <p><strong>Status:</strong> {result.status || 'N/A'}</p>

          <div className="button-group">
            <button  className='assbtn' onClick={() => handleViewDetails(index)}>
              {viewDetails[index] ? 'Hide Details' : 'View Details'}
            </button>
            <button className='assbtn' onClick={() => handleHire(result.applicantId, result.assessmentId)}>Hire</button>
            <button  className='assbtn' onClick={() => handleReject(result.applicantId, result.assessmentId)}>Reject</button>
          </div>

          {viewDetails[index] && result.answers && result.answers.length > 0 && (
            <div className="details-section">
              {result.answers.map((answer, ansIndex) => {
                const passedTestCases = answer.results ? answer.results.filter(res => res.passed).length : 0;

                return (
                  <div key={ansIndex} className="answer-section">
                    <h4>Code:</h4>
                    <pre>{answer.code || 'N/A'}</pre>
                    <p><strong>Passed Test Cases:</strong> {passedTestCases || 0}</p>
                    {answer.results && answer.results.length > 0 && (
                      <div className="result-detail">
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssessmentResultDetail;
