import React, { useState } from 'react';
import axios from 'axios';
import styles from '../CSS/resumeAnalyzer.module.css'
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
            <form onSubmit={handleSubmit} className={styles.uploadForm} data-aos="zoom-in">
                <h2>Resume and Job Description Analysis</h2>
                <div
                    className={styles.fileInputContainer}
                    onDragOver={preventDefaults}
                    onDrop={(event) => handleDrop(event, 'resume')}
                >
                    <label className={styles.fileInputLabel}>
                        {resume ? resume.name : 'Drag & Drop Resume or Click to Upload'}
                        <input
                            type="file"
                            onChange={(e) => setResume(e.target.files[0])}
                            className={styles.fileInput}
                        />
                    </label>
                </div>
                <div
                    className={styles.fileInputContainer}
                    onDragOver={preventDefaults}
                    onDrop={(event) => handleDrop(event, 'jd')}
                >
                    <label className={styles.fileInputLabel}>
                        {jobDescription ? jobDescription.name : 'Drag & Drop Job Description or Click to Upload'}
                        <input
                            type="file"
                            onChange={(e) => setJobDescription(e.target.files[0])}
                            className={styles.fileInput}
                        />
                    </label>
                </div>
                <button type="submit" className={styles.submitButton}>Analyze</button>
                {loading && <div className={styles.loader}>Loading...</div>}
            </form>
            {result && (
                <div className={styles.resultContainer}>
                    <h3 className={styles.resultTitle}>Result of RESUME Analysis</h3>
                    <div className={styles.resultItem}>
                        <strong className={styles.resultLabel}>Job Description Match: </strong>
                        <span className={styles.resultValue}>{result["JD Match"]}</span>
                    </div>
                    <div className={styles.resultItem}>
                        <strong className={styles.resultLabel}>Missing Keywords:</strong>
                        {result.MissingKeywords.length > 0 ? (
                            <ul className={styles.resultKeywords}>
                                {result.MissingKeywords.map((keyword, index) => (
                                    <li key={index} className={styles.keywordItem}>{keyword}</li>
                                ))}
                            </ul>
                        ) : (
                            <span className={styles.noKeywords}>No missing keywords</span>
                        )}
                    </div>
                    <div className={styles.resultItem}>
                        <strong className={styles.resultLabel}>Profile Summary:</strong>
                        <p className={styles.resultSummary}>{result["Profile Summary"]}</p>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default ResumeAnalyzer;
