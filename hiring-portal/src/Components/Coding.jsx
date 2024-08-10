import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import '../CSS/coding.css';

const Coding = () => {
    const navigate=useNavigate();
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResult, setTestResult] = useState('');
    const [assessment, setAssessment] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null); 
    const intervalRef = useRef(null);

    
    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/assessmen/66b73e699415ab907813ec6a');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAssessment(data);

            } catch (error) {
                console.error('Error fetching assessment:', error);
                setAssessment(null);
            }
        };

        fetchAssessment();
    }, []);
    useEffect(() => {
        if (assessment) {
            const savedStartTime = localStorage.getItem('startTime');
            const startTime = savedStartTime ? new Date(savedStartTime) : new Date();

            if (!savedStartTime) {
                localStorage.setItem('startTime', startTime);
            }

            intervalRef.current = setInterval(() => {
                const currentTime = new Date();
                const elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds
                const remaining = assessment.overallTime * 60 - elapsedTime;

                if (remaining <= 0) {
                    clearInterval(intervalRef.current);
                    localStorage.removeItem('startTime');
                    navigate('/')
                } else {
                    setRemainingTime(remaining);
                }
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [assessment]);

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

    return (
        <div className="coding-interface">
            {assessment ? (
                <>
                    <div className="timer">
                        <h2>Time Remaining: {formatTime(remainingTime)}</h2>
                    </div>
                    <div className="code-desc">
                        <h2>{assessment.questions[currentQuestion].codingQuestion.title}</h2>
                        <p><strong>Description:</strong> {assessment.questions[currentQuestion].codingQuestion.problemDescription}</p>
                        <p><strong>Constraints:</strong></p>
                        <ul>
                            {assessment.questions[currentQuestion].codingQuestion.constraints.map((constraint, index) => (
                                <li key={index}>{constraint}</li>
                            ))}
                        </ul>
                        <p><strong>Examples:</strong></p>
                        {assessment.questions[currentQuestion].codingQuestion.examples.map((example, index) => (
                            <div key={index}>
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
                                >
                                    Submit
                                </Button>
                            </>
                        </div>
                        <div className="testcases">
                            <h3>Output</h3>
                            <pre>{output}</pre>
                            <h3>Test Result</h3>
                            <pre>{testResult}</pre>
                        </div>
                        <div className="question-navigation">
                            <Button
                                variant="contained"
                                onClick={previousQuestion}
                                disabled={currentQuestion === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                onClick={nextQuestion}
                                disabled={currentQuestion === assessment.questions.length - 1}
                            >
                                Next
                            </Button>
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
