import React, { useState, useEffect } from 'react';
import styles from '../CSS/DiscussionSection.module.css';
import Navbar from './Navbar';
import Footer from './Footer';

// QuestionForm Component (for submitting questions)
const QuestionForm = ({ addQuestion }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            addQuestion(content);
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ask your question..."
                className={styles.textarea}
                required
            />
            <button type="submit" className={styles.submitButton}>
                Ask Question
            </button>
        </form>
    );
};

// AnswerForm Component (for submitting answers to questions)
const AnswerForm = ({ questionId, addAnswer }) => {
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
                required
            />
            <button type="submit" className={styles.submitButton}>
                Submit Answer
            </button>
        </form>
    );
};

// QuestionCard Component (for displaying each question and its answer)
const QuestionCard = ({ question, addAnswer }) => {
    return (
        <>
            <div className={styles.card}>
                <p className={styles.questionContent}>{question.content}</p>
                {question.answered ? (
                    <div className={styles.answers}>
                        <h3 className={styles.answerTitle}>Answer:</h3>
                        <p>{question.answer}</p>
                    </div>
                ) : (
                    <AnswerForm questionId={question.id} addAnswer={addAnswer} />
                )}
            </div>
        </>
    );
};

// QuestionList Component (for displaying unanswered and answered questions)
const QuestionList = ({ questions, addAnswer }) => {
    const unansweredQuestions = questions.filter((q) => !q.answered);
    const answeredQuestions = questions.filter((q) => q.answered);

    return (
        <div className={styles.listContainer}>
            <h2 className={styles.sectionTitle}>Unanswered Questions</h2>
            <div className={styles.section}>
                {unansweredQuestions.length === 0 ? (
                    <p>No unanswered questions yet.</p>
                ) : (
                    unansweredQuestions.map((q) => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            addAnswer={addAnswer}
                        />
                    ))
                )}
            </div>


            <h2 className={styles.sectionTitle}>Answered Questions</h2>
            <div className={styles.section}>
                {answeredQuestions.length === 0 ? (
                    <p>No answered questions yet.</p>
                ) : (
                    answeredQuestions.map((q) => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            addAnswer={addAnswer}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

// Main DiscussionForum Component
const DiscussionForum = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Load questions from localStorage on component mount
        const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(savedQuestions);
    }, []);

    useEffect(() => {
        // Save questions to localStorage whenever they change
        localStorage.setItem('questions', JSON.stringify(questions));
    }, [questions]);

    const addQuestion = (questionContent) => {
        const newQuestion = {
            id: Date.now(),
            content: questionContent,
            answered: false,
            answer: '',
        };
        setQuestions([...questions, newQuestion]);
    };

    const addAnswer = (questionId, answerContent) => {
        const updatedQuestions = questions.map((q) =>
            q.id === questionId ? { ...q, answered: true, answer: answerContent } : q
        );
        setQuestions(updatedQuestions);
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Discussion Forum</h1>
                <QuestionForm addQuestion={addQuestion} />
                <QuestionList questions={questions} addAnswer={addAnswer} />
            </div>
            <Footer />

        </>
    );
};

export default DiscussionForum;
