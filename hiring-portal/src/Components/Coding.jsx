import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/coding.css';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Coding = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResult, setTestResult] = useState('');
    const [assessment, setAssessment] = useState(null); 
    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/assessmen/66b6734a83c639090792d0c2');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAssessment(data);
            } catch (error) {
                console.error('Error fetching assessment:', error);
                setAssessment(null);  // Optionally handle error state
            }
        };

        fetchAssessment();
    }, []);
    

    const runCode = () => {
        const passed = Math.random() > 0.5;
        setOutput(passed ? 'Output: Passed' : 'Output: Failed');
        setTestResult(passed ? 'All test cases passed' : 'Some test cases failed');
    };

    const submitCode = () => {
        alert('Code submitted!');
    };

    return (
        <div className="coding-interface">
            {assessment ? (
                <>
                    <div className="code-desc">
                        <h2>{assessment.questions[0].codingQuestion.title}</h2>
                        <p><strong>Description:</strong> {assessment.questions[0].codingQuestion.problemDescription}</p>
                        <p><strong>Constraints:</strong></p>
                        <ul>
                            {assessment.questions[0].codingQuestion.constraints.map((constraint, index) => (
                                <li key={index}>{constraint}</li>
                            ))}
                        </ul>
                        <p><strong>Examples:</strong></p>
                        {assessment.questions[0].codingQuestion.examples.map((example, index) => (
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
                    </div>
                </>
            ) : (
                <p>Loading assessment...</p>
            )}
        </div>
    );
};

export default Coding;
