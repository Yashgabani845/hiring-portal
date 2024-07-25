import React, { useState } from "react";

const CreateAssessment = () => {
  const [formData, setFormData] = useState({
    jobId: "", 
    questions: [],
    overallTime: 0,
    maxMarks: 0
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    type: "coding", 
    codingQuestion: {
      title: "",
      problemDescription: "",
      constraints: [""],
      examples: [{ input: "", output: "", explanation: "" }],
      testCases: [{ input: "", output: "" }],
      codingSolution: ""
    }
  });

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value
    }));
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = e.target.value;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: newOptions
    }));
  };

  const handleCodingQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      codingQuestion: {
        ...prevQuestion.codingQuestion,
        [name]: value
      }
    }));
  };

  const handleExampleChange = (index, e) => {
    const newExamples = [...currentQuestion.codingQuestion.examples];
    newExamples[index][e.target.name] = e.target.value;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      codingQuestion: {
        ...prevQuestion.codingQuestion,
        examples: newExamples
      }
    }));
  };

  const handleTestCaseChange = (index, e) => {
    const newTestCases = [...currentQuestion.codingQuestion.testCases];
    newTestCases[index][e.target.name] = e.target.value;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      codingQuestion: {
        ...prevQuestion.codingQuestion,
        testCases: newTestCases
      }
    }));
  };

  const addOption = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, ""]
    }));
  };

  const addConstraint = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      codingQuestion: {
        ...prevQuestion.codingQuestion,
        constraints: [...prevQuestion.codingQuestion.constraints, ""]
      }
    }));
  };

  const addExample = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      codingQuestion: {
        ...prevQuestion.codingQuestion,
        examples: [...prevQuestion.codingQuestion.examples, { input: "", output: "", explanation: "" }]
      }
    }));
  };

  const addTestCase = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      codingQuestion: {
        ...prevQuestion.codingQuestion,
        testCases: [...prevQuestion.codingQuestion.testCases, { input: "", output: "" }]
      }
    }));
  };

  const addQuestion = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [...prevFormData.questions, currentQuestion]
    }));
    setCurrentQuestion({
      type: "coding",
      codingQuestion: {
        title: "",
        problemDescription: "",
        constraints: [""],
        examples: [{ input: "", output: "", explanation: "" }],
        testCases: [{ input: "", output: "" }],
        codingSolution: ""
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Create Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Overall Time:</label>
          <br />
          <input
            type="number"
            value={formData.overallTime}
            onChange={(e) => setFormData({ ...formData, overallTime: e.target.value })}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Max Marks:</label>
          <br />
          <input
            type="number"
            value={formData.maxMarks}
            onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Questions:</label>
          {formData.questions.map((question, index) => (
            <div key={`question-${index}`} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
              <p><strong>Question {index + 1}</strong></p>            
              {question.type === "coding" && (
                <div>
                  <p>Title: {question.codingQuestion.title}</p>
                  <p>Problem Description: {question.codingQuestion.problemDescription}</p>
                  <p>Constraints:</p>
                  {question.codingQuestion.constraints.map((constraint, constraintIndex) => (
                    <p key={`constraint-${constraintIndex}`}>{constraint}</p>
                  ))}
                  <p>Examples:</p>
                  {question.codingQuestion.examples.map((example, exampleIndex) => (
                    <div key={`example-${exampleIndex}`}>
                      <p>Input: {example.input}</p>
                      <p>Output: {example.output}</p>
                      <p>Explanation: {example.explanation}</p>
                    </div>
                  ))}
                  <p>Test Cases:</p>
                  {question.codingQuestion.testCases.map((testCase, testCaseIndex) => (
                    <div key={`test-case-${testCaseIndex}`}>
                      <p>Input: {testCase.input}</p>
                      <p>Output: {testCase.output}</p>
                    </div>
                  ))}
                  <p>Coding Solution: {question.codingQuestion.codingSolution}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <hr />

        <div style={{ marginBottom: "15px" }}>
          <label>Add Question:</label>
          <br />
          <select
            value={currentQuestion.type}
            onChange={handleQuestionChange}
            name="type"
            style={{ padding: "5px", width: "100%" }}
          >
            <option value="coding">Coding</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Question Text:</label>
          <br />
          <input
            type="text"
            value={currentQuestion.questionText}
            onChange={handleQuestionChange}
            name="questionText"
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        {currentQuestion.type === "MCQ" && (
          <div style={{ marginBottom: "15px" }}>
            <label>Options:</label>
            {currentQuestion.options.map((option, index) => (
              <div key={`option-${index}`} style={{ marginBottom: "5px" }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e)}
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
            ))}
            <button type="button" onClick={addOption} style={{ padding: "5px" }}>
              Add Option
            </button>
            <br />
            <label>Correct Answer:</label>
            <br />
            <input
              type="text"
              value={currentQuestion.correctAnswer}
              onChange={handleQuestionChange}
              name="correctAnswer"
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
        )}

        {currentQuestion.type === "coding" && (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <label>Title:</label>
              <br />
              <input
                type="text"
                value={currentQuestion.codingQuestion.title}
                onChange={handleCodingQuestionChange}
                name="title"
                style={{ width: "100%", padding: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Problem Description:</label>
              <br />
              <textarea
                value={currentQuestion.codingQuestion.problemDescription}
                onChange={handleCodingQuestionChange}
                name="problemDescription"
                style={{ width: "100%", padding: "5px", minHeight: "100px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Constraints:</label>
              {currentQuestion.codingQuestion.constraints.map((constraint, index) => (
                <div key={`constraint-${index}`} style={{ marginBottom: "5px" }}>
                  <input
                    type="text"
                    value={constraint}
                    onChange={(e) => handleExampleChange(index, e)}
                    name="constraint"
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
              ))}
              <button type="button" onClick={addConstraint} style={{ padding: "5px" }}>
                Add Constraint
              </button>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Examples:</label>
              {currentQuestion.codingQuestion.examples.map((example, index) => (
                <div key={`example-${index}`} style={{ marginBottom: "10px" }}>
                  <label>Example {index + 1}:</label>
                  <br />
                  <label>Input:</label>
                  <br />
                  <input
                    type="text"
                    value={example.input}
                    onChange={(e) => handleExampleChange(index, e)}
                    name="input"
                    style={{ width: "100%", padding: "5px" }}
                  />
                  <br />
                  <label>Output:</label>
                  <br />
                  <input
                    type="text"
                    value={example.output}
                    onChange={(e) => handleExampleChange(index, e)}
                    name="output"
                    style={{ width: "100%", padding: "5px" }}
                  />
                  <br />
                  <label>Explanation:</label>
                  <br />
                  <textarea
                    value={example.explanation}
                    onChange={(e) => handleExampleChange(index, e)}
                    name="explanation"
                    style={{ width: "100%", padding: "5px", minHeight: "50px" }}
                  />
                </div>
              ))}
              <button type="button" onClick={addExample} style={{ padding: "5px" }}>
                Add Example
              </button>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Test Cases:</label>
              {currentQuestion.codingQuestion.testCases.map((testCase, index) => (
                <div key={`test-case-${index}`} style={{ marginBottom: "10px" }}>
                  <label>Test Case {index + 1}:</label>
                  <br />
                  <label>Input:</label>
                  <br />
                  <input
                    type="text"
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(index, e)}
                    name="input"
                    style={{ width: "100%", padding: "5px" }}
                  />
                  <br />
                  <label>Output:</label>
                  <br />
                  <input
                    type="text"
                    value={testCase.output}
                    onChange={(e) => handleTestCaseChange(index, e)}
                    name="output"
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
              ))}
              <button type="button" onClick={addTestCase} style={{ padding: "5px" }}>
                Add Test Case
              </button>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Coding Solution:</label>
              <br />
              <textarea
                value={currentQuestion.codingQuestion.codingSolution}
                onChange={handleCodingQuestionChange}
                name="codingSolution"
                style={{ width: "100%", padding: "5px", minHeight: "100px" }}
              />
            </div>
          </div>
        )}

        <button type="button" onClick={addQuestion} style={{ padding: "10px 20px" }}>
          Add Question
        </button>

        <br />
        <br />

        <button type="submit" style={{ padding: "10px 20px" }}>
          Save Assessment
        </button>
      </form>
    </div>
  );
};

export default CreateAssessment;
