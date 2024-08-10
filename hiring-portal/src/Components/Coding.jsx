import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to extract URL parameters
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuizIcon from '@mui/icons-material/Quiz';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../CSS/coding.css';

const Coding = () => {
    const { assessmentId } = useParams(); // Extract the assessmentId from the URL
    const navigate = useNavigate();
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResult, setTestResult] = useState('');
    const [assessment, setAssessment] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false); // To track if the test is currently active
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/assessmen/${assessmentId}`); // Use assessmentId from URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAssessment(data);

                const currentTime = new Date();
                const testStartTime = new Date(data.startTime); 
                const testEndTime = new Date(data.endTime); 

                if (currentTime >= testStartTime && currentTime <= testEndTime) {
                    setIsTestActive(true);
                } else {
                    setIsTestActive(false);
                }

            } catch (error) {
                console.error('Error fetching assessment:', error);
                setAssessment(null);
            }
        };

        fetchAssessment();
    }, [assessmentId]);

    useEffect(() => {
        if (assessment && isTestActive) {
            const endTime = new Date(assessment.endTime);
    
            intervalRef.current = setInterval(() => {
                const currentTime = new Date();
                const remaining = Math.floor((endTime - currentTime) / 1000);
    
                if (remaining <= 0) {
                    clearInterval(intervalRef.current);
                    localStorage.removeItem('startTime');
                    navigate('/');
                } else {
                    setRemainingTime(remaining);
                }
            }, 1000);
    
            return () => clearInterval(intervalRef.current);
        }
    }, [assessment, isTestActive, navigate]);
    

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const runCode = () => {
        const passed = Math.random() > 0.5;
        setOutput(passed ? 'Output: Passed' : 'Output: Failed');
        setTestResult(passed ? 'All test cases passed' : 'Some test cases failed');
    };

    const submitCode = () => {
        alert('Code submitted!');
    };

    const nextQuestion = () => {
        if (currentQuestion < assessment.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    if (!isTestActive) {
        return (
            <div className="coding-interface">
                {assessment ? (
                    <div className="test-inactive">
                        <h2>This test was scheduled to be conducted between:</h2>
                        <p><strong>Start Time:</strong> {new Date(assessment.startTime).toLocaleString()}</p>
                        <p><strong>End Time:</strong> {new Date(assessment.endTime).toLocaleString()}</p>
                        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                            Go Back to Homepage
                        </Button>
                    </div>
                ) : (
                    <p>Loading assessment...</p>
                )}
            </div>
        );
    }

    return (
        <div className="coding-interface">
            {assessment ? (
                <>
                    <div className="timer">
                        <h2><AccessTimeIcon /> Time Remaining: {formatTime(remainingTime)}</h2>
                        <h2><QuizIcon /> Question {currentQuestion + 1} of {assessment.questions.length}</h2>
                    </div>
                    <div className="codingarea">
                        <div className="code-desc">
                            <h2> {assessment.questions[currentQuestion].codingQuestion.title}</h2>
                            <p><strong> Description:</strong> {assessment.questions[currentQuestion].codingQuestion.problemDescription}</p>
                            <p><strong> Constraints:</strong></p>
                            <ul>
                                {assessment.questions[currentQuestion].codingQuestion.constraints.map((constraint, index) => (
                                    <li key={index}>{constraint}</li>
                                ))}
                            </ul>
                            <p><strong> Examples:</strong></p>
                            {assessment.questions[currentQuestion].codingQuestion.examples.map((example, index) => (
                                <div key={index} className="example-section">
                                    <p><strong>Input:</strong> {example.input}</p>
                                    <p><strong>Output:</strong> {example.output}</p>
                                    {example.explanation && <p><strong>Explanation:</strong> {example.explanation}</p>}
                                </div>
                            ))}
                        </div>
                        <div className="code-editor">
                            <div className="editor-header">
                                <label>
                                    Language:
                                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="java">Java</option>
                                        <option value="cpp">C/C++</option>
                                        <option value="csharp">C#</option>
                                    </select>
                                </label>
                            </div>
                            <div className="monaco-editor">
                                <Editor
                                    height="400px"
                                    language={language}
                                    theme="vs-light"
                                    value={code}
                                    onChange={(newValue) => setCode(newValue)}
                                    options={{
                                        inlineSuggest: true,
                                        fontSize: "16px",
                                        formatOnType: true,
                                        autoClosingBrackets: true,
                                        minimap: {
                                            enabled: false
                                        }
                                    }}
                                />
                            </div>
                            <div className="editor-actions">
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={runCode}
                                        style={{ marginRight: '10px' }}
                                        startIcon={<PlayArrowIcon />}
                                    >
                                        Run
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={submitCode}
                                        startIcon={<CheckCircleOutlineIcon />}
                                    >
                                        Submit
                                    </Button>
                                </>
                            </div>
                            <div className="testcases">
                                <h3><CodeIcon /> Output</h3>
                                <pre>{output}</pre>
                                <h3><CheckCircleOutlineIcon /> Test Result</h3>
                                <pre>{testResult}</pre>
                            </div>
                            <div className="question-navigation">
                                <Button
                                    variant="contained"
                                    onClick={previousQuestion}
                                    disabled={currentQuestion === 0}
                                    startIcon={<NavigateBeforeIcon />}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={nextQuestion}
                                    disabled={currentQuestion === assessment.questions.length - 1}
                                    endIcon={<NavigateNextIcon />}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading assessment...</p>
            )}
        </div>
    );
};

export default Coding;
