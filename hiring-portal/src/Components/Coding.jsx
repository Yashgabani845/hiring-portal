import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const { assessmentId } = useParams();
    const navigate = useNavigate();
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResult, setTestResult] = useState('');
    const [assessment, setAssessment] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);
    const [isTestSubmitted, setIsTestSubmitted] = useState(false); 

    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/assessmen/${assessmentId}`);
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

                const resultResponse = await fetch(`http://localhost:5000/result/${localStorage.getItem('userEmail')}/${assessmentId}`);
                const resultData = await resultResponse.json();
                setIsTestSubmitted(resultData.status==="submitted");

            } catch (error) {
                console.error('Error fetching assessment:', error);
                setAssessment(null);
            }
        };

        fetchAssessment();
    }, [assessmentId]);

    useEffect(() => {
        if (assessment && isTestActive && !isTestSubmitted) {
            const endTime = new Date(assessment.endTime);

            intervalRef.current = setInterval(() => {
                const currentTime = new Date();
                const remaining = Math.floor((endTime - currentTime) / 1000);

                if (remaining <= 0) {
                    clearInterval(intervalRef.current);
                    localStorage.removeItem('startTime');
                    endTest(); 
                } else {
                    setRemainingTime(remaining);
                }
            }, 1000);

            return () => clearInterval(intervalRef.current);
        }
    }, [assessment, isTestActive, isTestSubmitted, navigate]);

    const endTest = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const response = await fetch('http://localhost:5000/endtest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    assessmentId
                }),
            });

            const data = await response.json();
            console.log(data.message);
            navigate('/'); 
        } catch (error) {
            console.error('Error ending test:', error);
        }
    };


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const runCode = () => {
       
        setOutput('submit to check output ');
        setTestResult(  ' test cases passed' );
    };

    const submitCode = async () => {
        try {
            const testcases = assessment.questions[currentQuestion].codingQuestion.testCases;
            const question = assessment.questions[currentQuestion].codingQuestion;
            console.log(testcases);
            const email = localStorage.getItem('userEmail')
            const response = await fetch('http://localhost:5000/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    language,
                    code,
                    testcases,
                    email,
                    assessmentId
                }),
            });

            const data = await response.json();
            let results = Array.isArray(data) ? data : [];
            if (data.error) {
                setOutput('Error: ' + data.error);
                setTestResult([]);
                return;
            }

            let passedCount = 0;
            let failedCount = 0;
            let resultsToDisplay = [];
            results.forEach((result) => {
                if (result.passed) {
                    passedCount++;
                } else {
                    failedCount++;
                }
            });
            if (failedCount > 0) {
                resultsToDisplay = results.filter(result => !result.passed);
            } else {
                resultsToDisplay = results.slice(0, 2);
            }

            setOutput(`Passed: ${data.index}/${testcases.length}`);
            setTestResult(
                resultsToDisplay.map((result, index) => (
                    <div key={index} className={result.passed ? 'testcase-passed' : 'testcase-failed'}>
                        <p><strong>Test Case {index + 1}:</strong></p>
                        <p><strong>Input:</strong> {result.input}</p>
                        <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
                        <p><strong>Output:</strong> {result.output}</p>
                        <p>{result.passed ? 'Passed' : 'Failed'}</p>
                    </div>
                ))
            );
        } catch (error) {
            console.error('Error submitting code:', error);
            setOutput('Error submitting code.');
            setTestResult([]);
        }
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

    if (isTestSubmitted) {
        return (
            <div className="coding-interface">
                <div className="test-submitted">
                    <h2>Thank you for your submission!</h2>
                    <p>Your test has been successfully submitted. You will be informed of the next steps via email.</p>
                    <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                        Go Back to Homepage
                    </Button>
                </div>
            </div>
        );
    }

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
                    <center>  <div className="timer">
                        <h2><AccessTimeIcon /> Time Remaining: {formatTime(remainingTime)}</h2>
                        <h2><QuizIcon /> Question {currentQuestion + 1} of {assessment.questions.length}</h2>
                    </div></center>
                    <div className="codingarea">
                        <div className="code-desc">
                            <h2> {assessment.questions[currentQuestion].codingQuestion.title}</h2>
                            <div>
                                <p><strong>Description:</strong></p>
                                <div dangerouslySetInnerHTML={{ __html: assessment.questions[currentQuestion].codingQuestion.problemDescription }} />
                            </div>
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
                                        <option value="cpp">C++</option>
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
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={endTest}
                                    style={{ marginLeft: '10px' }}
                                >
                                    End Test
                                </Button>
                            </div>

                            <div className="testcases">
                                <h3><CodeIcon /> Output</h3>
                                <pre>{output}</pre>
                                <h3><CheckCircleOutlineIcon /> Test Result</h3>
                                <div>{testResult}</div>
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