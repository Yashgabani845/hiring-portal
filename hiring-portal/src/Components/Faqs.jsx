import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../CSS/faqSection.css";

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        { question: "How can I apply for a job?", answer: "You can apply by signing up, creating a profile, and submitting your resume." },
        { question: "What is the hiring process?", answer: "The process includes applying for a job, interviews, and a final evaluation before the offer." },
        { question: "How do I track my application?", answer: "You can track your application status from your profile dashboard." },
        { question: "Can I apply for multiple jobs?", answer: "Yes, you can apply for multiple jobs and track each one separately." },
        { question: "What are the job requirements?", answer: "Job requirements vary by position, but they are typically listed in the job description." },
        { question: "How do I reset my password?", answer: "You can reset your password by clicking the 'Forgot Password' link on the login page." },
        { question: "Can I edit my profile?", answer: "Yes, you can edit your profile information at any time from your account settings." },
        { question: "Is there a way to withdraw my application?", answer: "Yes, you can withdraw an application from your profile dashboard at any time." }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <section className="faq-section" id="faqs">
                <h2 className="faq-title">Frequently Asked Questions</h2>
                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? "active" : ""}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="icon">
                                    {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                                </span>
                            </div>
                            <div className={`faq-answer ${activeIndex === index ? "open" : ""}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default FAQSection;
