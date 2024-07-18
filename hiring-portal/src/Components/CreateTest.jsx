import React, { useState } from 'react';
import '../CSS/createTest.css';

const CreateTest = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        type: 'mcq',
        text: '',
        options: [],
        correctAnswer: '',
        codingOutput: '',
        marks: 0,
        time: 0
    });

    const handleQuestionChange = (e) => {
        setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });
    };

    const addOption = () => {
        setCurrentQuestion({ ...currentQuestion, options: [...currentQuestion.options, ''] });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const addQuestion = () => {
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            type: 'mcq',
            text: '',
            options: [],
            correctAnswer: '',
            codingOutput: '',
            marks: 0,
            time: 0
        });
    };

    const handleSubmit = () => {
        // Submit the test data to the server or store it in the state
        console.log('Test created', questions);
    };

    return (
        <div className="create-test">
            <h1>Create Test</h1>
            <div className="question-form">
                <label>
                    Question Type:
                    <select name="type" value={currentQuestion.type} onChange={handleQuestionChange}>
                        <option value="mcq">MCQ</option>
                        <option value="textual">Textual</option>
                        <option value="coding">Coding</option>
                    </select>
                </label>
                <label>
                    Question Text:
                    <textarea name="text" value={currentQuestion.text} onChange={handleQuestionChange} />
                </label>
                {currentQuestion.type === 'mcq' && (
                    <>
                        <label>Options:</label>
                        {currentQuestion.options.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        ))}
                        <button type="button" onClick={addOption}>Add Option</button>
                        <label>
                            Correct Answer:
                            <input name="correctAnswer" value={currentQuestion.correctAnswer} onChange={handleQuestionChange} />
                        </label>
                    </>
                )}
                {currentQuestion.type === 'coding' && (
                    <label>
                        Expected Output:
                        <textarea name="codingOutput" value={currentQuestion.codingOutput} onChange={handleQuestionChange} />
                    </label>
                )}
                <label>
                    Marks:
                    <input type="number" name="marks" value={currentQuestion.marks} onChange={handleQuestionChange} />
                </label>
                <label>
                    Time (in minutes):
                    <input type="number" name="time" value={currentQuestion.time} onChange={handleQuestionChange} />
                </label>
                <button type="button" onClick={addQuestion}>Add Question</button>
            </div>
            <div className="question-list">
                <h2>Questions</h2>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>
                            {question.text} ({question.marks} marks)
                        </li>
                    ))}
                </ul>
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Submit Test</button>
        </div>
    );
};

export default CreateTest;
