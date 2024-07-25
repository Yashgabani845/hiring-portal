  import React, { useState } from "react";
  import "../CSS/test.css"
  const CreateAssessment = () => {
    const [formData, setFormData] = useState({
      jobId: "",
      questions: [],
      overallTime: 0,
      maxMarks: 0,
    });
  
    const [currentQuestion, setCurrentQuestion] = useState({
      type: "coding",
      codingQuestion: {
        title: "",
        problemDescription: "",
        constraints: [""],
        examples: [{ input: "", output: "", explanation: "" }],
        testCases: [{ input: "", output: "" }],
        codingSolution: "",
        marks: 0,
      },
    });
  
    const [currentStep, setCurrentStep] = useState(1);
    const [modalData, setModalData] = useState(null);
  
    const handleModalSave = () => {
      handleModalClose();
    };
    const handleCodingQuestionChange = (e) => {
      const { name, value } = e.target;
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        codingQuestion: {
          ...prevQuestion.codingQuestion,
          [name]: value,
        },
      }));
    };
  
    const handleExampleChange = (index, e) => {
      const newExamples = [...currentQuestion.codingQuestion.examples];
      newExamples[index][e.target.name] = e.target.value;
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        codingQuestion: {
          ...prevQuestion.codingQuestion,
          examples: newExamples,
        },
      }));
    };
  
    const handleTestCaseChange = (index, e) => {
      const newTestCases = [...currentQuestion.codingQuestion.testCases];
      newTestCases[index][e.target.name] = e.target.value;
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        codingQuestion: {
          ...prevQuestion.codingQuestion,
          testCases: newTestCases,
        },
      }));
    };
  
    const handleConstraintChange = (index, e) => {
      const newConstraints = [...currentQuestion.codingQuestion.constraints];
      newConstraints[index] = e.target.value;
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        codingQuestion: {
          ...prevQuestion.codingQuestion,
          constraints: newConstraints,
        },
      }));
    };
  
    const addConstraint = () => {
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        codingQuestion: {
          ...prevQuestion.codingQuestion,
          constraints: [...prevQuestion.codingQuestion.constraints, ""],
        },
      }));
    };
  
    const addExample = () => {
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        codingQuestion: {
          ...prevQuestion.codingQuestion,
          examples: [...prevQuestion.codingQuestion.examples, { input: "", output: "", explanation: "" }],
        },
      }));
    };
  
    const addTestCase = () => {
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        codingQuestion: {
          ...prevQuestion.codingQuestion,
          testCases: [...prevQuestion.codingQuestion.testCases, { input: "", output: "" }],
        },
      }));
    };
  
    const addQuestion = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: [...prevFormData.questions, currentQuestion],
      }));
      setCurrentQuestion({
        type: "coding",
        codingQuestion: {
          title: "",
          problemDescription: "",
          constraints: [""],
          examples: [{ input: "", output: "", explanation: "" }],
          testCases: [{ input: "", output: "" }],
          codingSolution: "",
          marks: 0,
        },
      });
      setCurrentStep(1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
    };
  
    const nextStep = () => {
      setCurrentStep((prevStep) => prevStep + 1);
    };
  
    const prevStep = () => {
      setCurrentStep((prevStep) => prevStep - 1);
    };
  
    const handleModalOpen = (question) => {
      setModalData(question);
    };
  
    const handleModalClose = () => {
      setModalData(null);
    };
  
    const renderStep = () => {
      switch (currentStep) {
        case 1:
          return (
            <div>
              <h3>Title</h3>
              <input
                type="text"
                value={currentQuestion.codingQuestion.title}
                onChange={handleCodingQuestionChange}
                name="title"
                style={{ width: "100%", padding: "5px" }}
              />
              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={nextStep} style={{ padding: "10px" }}>
                  Next
                </button>
              </div>
            </div>
          );
        case 2:
          return (
            <div>
              <h3>Problem Description</h3>
              <textarea
                value={currentQuestion.codingQuestion.problemDescription}
                onChange={handleCodingQuestionChange}
                name="problemDescription"
                style={{ width: "100%", padding: "5px", minHeight: "100px" }}
              />
              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} style={{ padding: "10px" }}>
                  Next
                </button>
              </div>
            </div>
          );
        case 3:
          return (
            <div>
              <h3>Constraints</h3>
              {currentQuestion.codingQuestion.constraints.map((constraint, index) => (
                <div key={`constraint-${index}`} style={{ marginBottom: "5px" }}>
                  <input
                    type="text"
                    value={constraint}
                    onChange={(e) => handleConstraintChange(index, e)}
                    name="constraint"
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
              ))}
              <button type="button" onClick={addConstraint} style={{ padding: "5px", marginTop: "10px" }}>
                Add Constraint
              </button>
              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} style={{ padding: "10px" }}>
                  Next
                </button>
              </div>
            </div>
          );
        case 4:
          return (
            <div>
              <h3>Examples</h3>
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
              <button type="button" onClick={addExample} style={{ padding: "5px", marginTop: "10px" }}>
                Add Example
              </button>
              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} style={{ padding: "10px" }}>
                  Next
                </button>
              </div>
            </div>
          );
        case 5:
          return (
            <div>
              <h3>Test Cases</h3>
              {currentQuestion.codingQuestion.testCases.map((testCase, index) => (
                <div key={`testCase-${index}`} style={{ marginBottom: "10px" }}>
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
              <button type="button" onClick={addTestCase} style={{ padding: "5px", marginTop: "10px" }}>
                Add Test Case
              </button>
              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} style={{ padding: "10px" }}>
                  Next
                </button>
              </div>
            </div>
          );
        case 6:
          return (
            <div>
              <h3>Solution</h3>
              <textarea
                value={currentQuestion.codingQuestion.codingSolution}
                onChange={handleCodingQuestionChange}
                name="codingSolution"
                style={{ width: "100%", padding: "5px", minHeight: "100px" }}
              />
              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} style={{ padding: "10px" }}>
                  Next
                </button>
              </div>
            </div>
          );
        case 7:
          return (
            <div>
              <h3>Marks</h3>
              <input
                type="number"
                value={currentQuestion.codingQuestion.marks}
                onChange={handleCodingQuestionChange}
                name="marks"
                style={{ width: "100%", padding: "5px" }}
              />
              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                  Previous
                </button>
                <button type="button" onClick={addQuestion} style={{ padding: "10px" }}>
                  Add Question
                </button>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="assessment-container">
        <h2>Create Assessment</h2>
        <form onSubmit={handleSubmit}>
          <div className="global-fields">
            <label>Overall Time (in minutes):</label>
            <input
              type="number"
              value={formData.overallTime}
              onChange={(e) => setFormData({ ...formData, overallTime: e.target.value })}
              style={{ width: "100%", padding: "5px" }}
            />
            <label>Max Marks:</label>
            <input
              type="number"
              value={formData.maxMarks}
              onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
          <div className="step-container">
            {renderStep()}
          </div>
          <button type="submit" style={{ padding: "10px", marginTop: "20px" }}>
            Submit
          </button>
        </form>
        <div className="added-questions">
          <h3>Added Questions</h3>
          {formData.questions.map((question, index) => (
            <div
              key={`question-${index}`}
              onClick={() => handleModalOpen(question)}
              style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", cursor: "pointer" }}
            >
              {question.codingQuestion.title}
            </div>
          ))}
        </div>
        {modalData && (
          <div className="modal">
            <div className="modal-content">
              <h3>Question Details</h3>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={modalData.codingQuestion.title}
                  onChange={(e) => setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, title: e.target.value } })}
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div>
                <label>Problem Description:</label>
                <textarea
                  value={modalData.codingQuestion.problemDescription}
                  onChange={(e) => setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, problemDescription: e.target.value } })}
                  style={{ width: "100%", padding: "5px", minHeight: "100px" }}
                />
              </div>
              <div>
                <label>Constraints:</label>
                {modalData.codingQuestion.constraints.map((constraint, index) => (
                  <div key={`modal-constraint-${index}`}>
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => {
                        const newConstraints = [...modalData.codingQuestion.constraints];
                        newConstraints[index] = e.target.value;
                        setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, constraints: newConstraints } });
                      }}
                      style={{ width: "100%", padding: "5px" }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newConstraints = [...modalData.codingQuestion.constraints, ""];
                    setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, constraints: newConstraints } });
                  }}
                  style={{ padding: "5px", marginTop: "10px" }}
                >
                  Add Constraint
                </button>
              </div>
              <div>
                <label>Examples:</label>
                {modalData.codingQuestion.examples.map((example, index) => (
                  <div key={`modal-example-${index}`}>
                    <label>Input:</label>
                    <input
                      type="text"
                      value={example.input}
                      onChange={(e) => {
                        const newExamples = [...modalData.codingQuestion.examples];
                        newExamples[index] = { ...newExamples[index], input: e.target.value };
                        setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, examples: newExamples } });
                      }}
                      style={{ width: "100%", padding: "5px" }}
                    />
                    <label>Output:</label>
                    <input
                      type="text"
                      value={example.output}
                      onChange={(e) => {
                        const newExamples = [...modalData.codingQuestion.examples];
                        newExamples[index] = { ...newExamples[index], output: e.target.value };
                        setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, examples: newExamples } });
                      }}
                      style={{ width: "100%", padding: "5px" }}
                    />
                    <label>Explanation:</label>
                    <textarea
                      value={example.explanation}
                      onChange={(e) => {
                        const newExamples = [...modalData.codingQuestion.examples];
                        newExamples[index] = { ...newExamples[index], explanation: e.target.value };
                        setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, examples: newExamples } });
                      }}
                      style={{ width: "100%", padding: "5px", minHeight: "50px" }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newExamples = [...modalData.codingQuestion.examples, { input: "", output: "", explanation: "" }];
                    setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, examples: newExamples } });
                  }}
                  style={{ padding: "5px", marginTop: "10px" }}
                >
                  Add Example
                </button>
              </div>
              <div>
                <label>Test Cases:</label>
                {modalData.codingQuestion.testCases.map((testCase, index) => (
                  <div key={`modal-testCase-${index}`}>
                    <label>Input:</label>
                    <input
                      type="text"
                      value={testCase.input}
                      onChange={(e) => {
                        const newTestCases = [...modalData.codingQuestion.testCases];
                        newTestCases[index] = { ...newTestCases[index], input: e.target.value };
                        setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, testCases: newTestCases } });
                      }}
                      style={{ width: "100%", padding: "5px" }}
                    />
                    <label>Output:</label>
                    <input
                      type="text"
                      value={testCase.output}
                      onChange={(e) => {
                        const newTestCases = [...modalData.codingQuestion.testCases];
                        newTestCases[index] = { ...newTestCases[index], output: e.target.value };
                        setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, testCases: newTestCases } });
                      }}
                      style={{ width: "100%", padding: "5px" }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newTestCases = [...modalData.codingQuestion.testCases, { input: "", output: "" }];
                    setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, testCases: newTestCases } });
                  }}
                  style={{ padding: "5px", marginTop: "10px" }}
                >
                  Add Test Case
                </button>
              </div>
              <div>
                <label>Solution:</label>
                <textarea
                  value={modalData.codingQuestion.codingSolution}
                  onChange={(e) => setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, codingSolution: e.target.value } })}
                  style={{ width: "100%", padding: "5px", minHeight: "100px" }}
                />
              </div>
              <div>
                <label>Marks:</label>
                <input
                  type="number"
                  value={modalData.codingQuestion.marks}
                  onChange={(e) => setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, marks: e.target.value } })}
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div className="modal-buttons">
              <div className="modal-buttons">
              <button onClick={handleModalSave}>Save</button>
              <button onClick={handleModalClose}>Close</button>
            </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default CreateAssessment;
  