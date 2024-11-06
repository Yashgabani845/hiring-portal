import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../CSS/Feedback.module.css';
import Footer from './Footer';
import Navbar from './Navbar';

function Feedback() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rating, setRating] = useState(0); // State to manage rating

    const handleRatingChange = (value) => {
        setRating(value); // Update the rating state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (isSubmitting) return;

        setIsSubmitting(true); // Set isSubmitting to true right after checking

        // Gather form data
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries()); // Convert form data to an object

        try {
            const response = await fetch(`http://localhost:5000/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const result = await response.json();

            // Check if the request was successful
            if (response.status === 200) {  // Updated to check response status properly
                toast.info(result.message);
                e.target.reset();
                setRating(0);
                setIsSubmitting(false)
            } else {
                toast.error(result.message || 'Error in submission!');
            }
        } catch (error) {
            // Handle network or other fetch-related errors
            toast.error('Something went wrong. Please try again.');
        } finally {
            // Reset the submitting state regardless of the outcome
            setIsSubmitting(false);
        }
    };

    return (

        <>
            <Navbar />

            <div className={styles.formContainer}>
                <h2 className="text-center text-4xl font-bold text-gray-800 mb-10">We Value Your Feedback</h2>

                <form name="submit-to-google-sheet" onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="Name" className={styles.label}>Name:</label>
                            <input type="text" id="Name" name="Name" className={styles.input} placeholder="Enter your name *" required />
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="Email" className={styles.label}>Email:</label>
                            <input type="email" id="Email" name="Email" className={styles.input} placeholder="Enter your email *" required />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="Subject" className={styles.label}>Subject or Topic:</label>
                            <input type="text" id="Subject" name="Subject" className={styles.input} placeholder="Specify the subject" required />
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="Date" className={styles.label}>Date of Visit:</label>
                            <input type="date" id="Date" name="Date" className={styles.input} required />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="Device" className={styles.label}>Device Used:</label>
                            <select id="Device" name="Device" className={styles.select} required>
                                <option value="Desktop">Desktop</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Mobile">Mobile</option>
                            </select>
                        </div>

                        <div className={styles.inputContainer}>
                            <label htmlFor="Priority" className={styles.label}>Priority Level:</label>
                            <select id="Priority" name="Priority" className={styles.select} required>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Suggestions" className={styles.label}>Suggestions for Improvement:</label>
                        <textarea id="Suggestions" name="Suggestions" className={styles.textarea} rows="4" placeholder="Provide suggestions for improvement" required></textarea>
                    </div>

                    <div>
                        <label htmlFor="Feedback" className={styles.label}>Feedback:</label>
                        <textarea id="Feedback" name="Feedback" className={styles.textarea} rows="4" placeholder="Enter your feedback here" required></textarea>
                    </div>

                    <div className="flex flex-col mb-6">
                        <label htmlFor="Rating" className={styles.label}>Rating (1-10):</label>
                        <div className="flex items-center justify-center space-x-4">
                            {Array.from({ length: 10 }, (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleRatingChange(index + 1)}
                                    className={rating === index + 1 ? styles.selectedRating : styles.rating}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <input type="hidden" id="Rating" name="Rating" value={rating} />
                    </div>

                    <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}


export default Feedback;
