import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "../CSS/test.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from "react-toastify";
const CreateAssessment = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${jobId}`)
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error('Error fetching job:', error));
  }, [jobId]);

  const navigate = useNavigate();
  const ownerEmail = localStorage.getItem('userEmail');
  const [formData, setFormData] = useState({
    jobId: jobId,
    owner: ownerEmail,
    questions: [],
    overallTime: 0,
    maxMarks: 0,
    startTime: "",
    endTime: ""
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
  const Descriptionchange = (value) => {
    setCurrentQuestion(prevState => ({
      ...prevState,
      codingQuestion: {
        ...prevState.codingQuestion,
        problemDescription: value
      }
    }));
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
  const parseTestCases = (fileContent) => {
    const lines = fileContent.split('\n');
    const testCases = [];

    let input = '';
    let output = '';

    lines.forEach((line) => {
      if (line.startsWith('input:')) {
        input = line.replace('input:', '').trim();
      } else if (line.startsWith('output:')) {
        output = line.replace('output:', '').trim();
        if (input && output) {
          testCases.push({ input, output });
          input = '';
          output = '';
        }
      }
    });

    return testCases;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const testCases = parseTestCases(fileContent);

        setCurrentQuestion((prev) => ({
          ...prev,
          codingQuestion: {
            ...prev.codingQuestion,
            testCases: testCases,
          },
        }));
      };
      reader.readAsText(file);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/api/test", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Assessment created successfully:', data);
        navigate('/ownerside')
      } else {
        console.error('Error creating assessment:', data.message);
        toast.error("failed to upload job follow the credentials")
      }
    } catch (error) {
      console.error('Network error:', error);
    }
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
            <h3>Question titles</h3>
            <input
              type="text"
              className="qtitle"
              placeholder=" Ex: Two Sum"
              value={currentQuestion.codingQuestion.title}
              onChange={handleCodingQuestionChange}
              name="title"
            />
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Problem Description</h3>
            <ReactQuill
              value={currentQuestion.codingQuestion.problemDescription}
              onChange={Descriptionchange}
              theme="snow"
              placeholder="Enter problem description"
            />
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
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
            <button type="button" className="addbtn" onClick={addConstraint} style={{ padding: "5px", marginTop: "10px" }}>
              Add Constraint
            </button>
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
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
            <button type="button" className="addbtn" onClick={addExample} style={{ padding: "5px", marginTop: "10px" }}>
              Add Example
            </button>
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
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
            <button type="button" className="addbtn" onClick={addTestCase} style={{ padding: "5px", marginTop: "10px" }}>
              Add Test Case
            </button>
            <input
              type="file"
              className="prevbtn"
              style={{ padding: "5px", marginTop: "10px", marginLeft: "10px" }}
              onChange={handleFileUpload}
            />

            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo;  Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
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
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
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
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                Previous
              </button>
              <button type="button" className="addbtn" onClick={addQuestion} style={{ padding: "10px" }}>
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
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="global-fields">

          <label>Max Marks:</label>
          <input
            type="number"
            className="marksinput"
            value={formData.maxMarks}
            onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}

          />
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
        <div className="step-container">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((currentStep - 1) / 6) * 100}%` }}
            ></div>
          </div>
          {renderStep()}
        </div>
        <button type="submit" onClick={handleSubmit} className="submitbtn" style={{ padding: "10px", marginTop: "20px" }}>
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
                className="addbtn"
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
                className="addbtn"
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
                className="addbtn"
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
      )}   <ToastContainer />
    </div>

  );
};

export default CreateAssessment;
