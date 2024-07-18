import React, { useState, useEffect } from 'react';
import '../CSS/takeTest.css';

const TakeTest = ({ test }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(test.questions[currentQuestionIndex].time * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setTimeLeft(test.questions[currentQuestionIndex].time * 60);
    }, [currentQuestionIndex, test.questions]);

    const handleAnswerChange = (e) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < test.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        // Calculate the score
        let score = 0;
        test.questions.forEach((question, index) => {
            if (question.type === 'mcq' && question.correctAnswer === answers[index]) {
                score += question.marks;
            }
            // Additional scoring logic for textual and coding questions can be added here
        });
        alert(`Your score: ${score}`);
    };

    const renderQuestion = (question) => {
        switch (question.type) {
            case 'mcq':
                return (
                    <div className="question">
                        <h2>{question.text}</h2>
                        {question.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={answers[currentQuestionIndex] === option}
                                    onChange={handleAnswerChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            case 'textual':
                return (
                    <div className="question">
                        <h2>{question.text}</h2>
                        <textarea
                            value={answers[currentQuestionIndex] || ''}
                            onChange={handleAnswerChange}
                        />
                    </div>
                );
            case 'coding':
                return (
                    <div className="question">
                        <h2>{question.text}</h2>
                        <textarea
                            value={answers[currentQuestionIndex] || ''}
                            onChange={handleAnswerChange}
                            placeholder="Write your code here..."
                        />
                        <button className="run-code-btn">Run Code</button>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!test) {
        return <div>Please create a test first.</div>;
    }

    return (
        <div className="take-test">
            <h1>{test.title}</h1>
            <div className="timer">Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
            {renderQuestion(test.questions[currentQuestionIndex])}
            <div className="navigation">
                <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                {currentQuestionIndex < test.questions.length - 1 ? (
                    <button onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default TakeTest;
