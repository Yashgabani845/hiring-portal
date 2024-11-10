import { useState, useEffect } from 'react';
import styles from '../CSS/DiscussionSection.module.css';  // Import CSS Module
import Navbar from "./Navbar";
import Footer from "./Footer";

const DiscussionForum = () => {
    const [questions, setQuestions] = useState([]);

    // Fetch questions from the backend API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/discussion/getQuestion');
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data);
                } else {
                    console.error('Failed to fetch questions');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    // Helper function to save a new question
    const addQuestion = async (content) => {
        const newQuestion = {
            content,
            answered: false,
            answer: '',
        };

        try {
            const response = await fetch('http://localhost:5000/api/discussion/postQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion),
            });

            if (response.ok) {
                const savedQuestion = await response.json();
                setQuestions((prevQuestions) => [...prevQuestions, savedQuestion]);
            } else {
                console.error('Failed to add question');
            }
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    // Helper function to add an answer to a question
    const addAnswer = async (questionId, answerContent) => {
        console.log(questionId + " " + answerContent)
        try {
            const response = await fetch(`http://localhost:5000/api/discussion/${questionId}/answer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer: answerContent }),
            });

            if (response.ok) {
                const updatedQuestion = await response.json();
                setQuestions((prevQuestions) =>
                    prevQuestions.map((question) =>
                        question._id === questionId
                            ? { ...question, ...updatedQuestion }
                            : question
                    )
                );
            } else {
                console.error('Failed to add answer');
            }
        } catch (error) {
            console.error('Error adding answer:', error);
        }
    };

    // Function to render the Question Card
    const renderQuestionCard = (question) => {
        return (
            <div
                className={`${styles.card} ${styles.cardWrapper}`}
                key={question._id}
            >
                <p className={styles.questionContent}>{question.content}</p>
                {question.answered ? (
                    <div className={styles.answers}>
                        <h3 className={styles.answerTitle}>Answer:</h3>
                        <p>{question.answer}</p>
                    </div>
                ) : (
                    <AnswerForm questionId={question._id} />
                )}
            </div>
        );
    };

    // Function to render the Answer Form
    const AnswerForm = ({ questionId }) => {
        const [answer, setAnswer] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (answer.trim()) {
                addAnswer(questionId, answer);
                setAnswer('');
            }
        };

        return (
            <form onSubmit={handleSubmit} className={styles.answerForm}>
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your answer..."
                    className={styles.textarea}
                />
                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    Submit Answer
                </button>
            </form>
        );
    };

    // Function to render the Question Form
    const QuestionForm = () => {
        const [newQuestion, setNewQuestion] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (newQuestion.trim()) {
                addQuestion(newQuestion);
            }
        };

        return (
            <div className={styles.form}>
                <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask your question..."
                    className={styles.textarea}
                />
                <button
                    onClick={handleSubmit}
                    className={styles.submitButton}
                >
                    Ask Question
                </button>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>HIREHUB Discussion Forum</h1>

                <QuestionForm />

                <div className={styles.listContainer}>
                    <h2 className={styles.sectionTitle}>Unanswered Questions</h2>
                    <div className={styles.section}>
                        {questions
                            .filter((question) => !question.answered)
                            .map((question) => renderQuestionCard(question))}
                    </div>
                </div>

                <div className={styles.listContainer}>
                    <h2 className={styles.sectionTitle}>Answered Questions</h2>
                    <div className={styles.section}>
                        {questions
                            .filter((question) => question.answered)
                            .map((question) => renderQuestionCard(question))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DiscussionForum;
