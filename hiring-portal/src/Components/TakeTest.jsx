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

    return (
        <div className="take-test">
            <h1>{test.title}</h1>
            <div className="timer">Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
            <div className="question">
                <h2>{test.questions[currentQuestionIndex].text}</h2>
                {test.questions[currentQuestionIndex].type === 'mcq' && (
                    test.questions[currentQuestionIndex].options.map((option, index) => (
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
                    ))
                )}
                {test.questions[currentQuestionIndex].type === 'textual' && (
                    <textarea
                        value={answers[currentQuestionIndex] || ''}
                        onChange={handleAnswerChange}
                    />
                )}
                {test.questions[currentQuestionIndex].type === 'coding' && (
                    <textarea
                        value={answers[currentQuestionIndex] || ''}
                        onChange={handleAnswerChange}
                    />
                )}
            </div>
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
