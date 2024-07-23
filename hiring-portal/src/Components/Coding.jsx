import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/theme-github';
import '../CSS/coding.css';

const Coding = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResult, setTestResult] = useState('');

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
            <div className="code-desc">
                <h2>Problem Title</h2>
                <p><strong>Description:</strong> Sort the names based on heights in descending order.</p>
                <p><strong>Constraints:</strong></p>
                <ul>
                    <li>n == names.length == heights.length</li>
                    <li>1 = 10<sup>5</sup></li>
                    <li>names[i] consists of lower and upper case English letters</li>
                    <li>All the values of heights are distinct</li>
                </ul>
                <p><strong>Input Format:</strong> Two arrays, names and heights.</p>
                <p><strong>Output Format:</strong> Sorted array of names in descending order of heights.</p>
                <p><strong>Example Test Case 1:</strong> Input: names = ["Mary","John","Emma"], heights = [180,165,170]. Output: ["Mary","Emma","John"]</p>
                <p><strong>Example Test Case 2:</strong> Input: names = ["Alice","Bob","Bob"], heights = [155,185,150]. Output: ["Bob","Alice","Bob"]</p>
            </div>
            <div className="code-editor">
                <div className="editor-header">
                    <label>
                        Language:
                        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="c_cpp">C/C++</option>
                            <option value="csharp">C#</option>
                        </select>
                    </label>
                </div>
                <div className="ace-editor">
                    <AceEditor
                        mode={language}
                        theme="github"
                        value={code}
                        onChange={(newCode) => setCode(newCode)}
                        name="code-editor"
                        editorProps={{ $blockScrolling: true }}
                        height="400px"
                    />
                </div>
                <div className="editor-actions">
                    <button type="button" onClick={runCode}>Run</button>
                    <button type="button" onClick={submitCode}>Submit</button>
                </div>
                <div className="testcases">
                    <h3>Output</h3>
                    <pre>{output}</pre>
                    <h3>Test Result</h3>
                    <pre>{testResult}</pre>
                </div>
            </div>
        </div>
    );
};

export default Coding;
