import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/resumeAnalyzer.css'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const ResumeAnalyzer = () => {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();

    const handleDrop = (event, type) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            if (type === 'resume') {
                setResume(files[0]);
            } else {
                setJobDescription(files[0]);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jobDescription', jobDescription);

        try {
            const response = await axios.post('http://127.0.0.1:8000/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response);
            setLoading(false)
            const analysisResult = JSON.parse(response.data.analysis);
            setResult(analysisResult);

        } catch (error) {
            console.error('Error uploading files', error);
        }
    };
    const preventDefaults = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit} className="upload-form">
                <h2>Resume and Job Description Analysis</h2>
                <div
                    className="file-input-container"
                    onDragOver={preventDefaults}
                    onDrop={(event) => handleDrop(event, 'resume')}
                >
                    <label className="file-input-label">
                        {resume ? resume.name : 'Drag & Drop Resume or Click to Upload'}
                        <input
                            type="file"
                            onChange={(e) => setResume(e.target.files[0])}
                            className="file-input"
                        />
                    </label>
                </div>
                <div
                    className="file-input-container"
                    onDragOver={preventDefaults}
                    onDrop={(event) => handleDrop(event, 'jd')}
                >
                    <label className="file-input-label">
                        {jobDescription ? jobDescription.name : 'Drag & Drop Job Description or Click to Upload'}
                        <input
                            type="file"
                            onChange={(e) => setJobDescription(e.target.files[0])}
                            className="file-input"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">Analyze</button>
                {loading && <div className="loader">Loading...</div>}
            </form>
            {result && (
                <div className="result-container">
                    <h3 className="result-title">Result of RESUME Analysis</h3>
                    <div className="result-item">
                        <strong className="result-label">Job Description Match : </strong>
                        <span className="result-value">{result["JD Match"]}</span>
                    </div>
                    <div className="result-item">
                        <strong className="result-label">Missing Keywords:</strong>
                        {result.MissingKeywords.length > 0 ? (
                            <ul className="result-keywords">
                                {result.MissingKeywords.map((keyword, index) => (
                                    <li key={index} className="keyword-item">{keyword}</li>
                                ))}
                            </ul>
                        ) : (
                            <span className="no-keywords">No missing keywords</span>
                        )}
                    </div>
                    <div className="result-item">
                        <strong className="result-label">Profile Summary:</strong>
                        <p className="result-summary">{result["Profile Summary"]}</p>
                    </div>
                </div>

            )}
            <Footer />
        </>
    );
};

export default ResumeAnalyzer;
