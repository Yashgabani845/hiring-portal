import { useState, useEffect } from 'react';
import styles from '../CSS/Stories.module.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Stories = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        // Fetch posts from the backend API
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stories/getposts');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    console.error("Failed to fetch posts");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title && content && category) {
            const newPost = { title, content, category, date: new Date().toISOString() };

            try {
                const response = await fetch('http://localhost:5000/api/stories/saveposts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPost),
                });

                if (response.ok) {
                    const savedPost = await response.json();
                    setPosts([savedPost, ...posts]);  // Add the new post to state
                } else {
                    console.error("Failed to save the post");
                }
            } catch (error) {
                console.error("Error saving the post:", error);
            }

            // Clear form fields
            setTitle('');
            setContent('');
            setCategory('');
        }
    };

    return (
        <>
            <Navbar />

            <h1 className={styles.title}>Real Stories, Real Advice: Share Your Experience</h1>
            <div className={styles.container}>
                {/* Left side - Posts */}
                <div className={styles.postsContainer}>
                    {posts.length === 0 ? (
                        <p className={styles.loading}>No posts yet. Share your experience!</p>
                    ) : (
                        posts.map((post, index) => (
                            <div key={index} className={styles.postCard}>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <p className={styles.postCategory}>{post.category}</p>
                                <p className={styles.postContent}>{post.content}</p>
                                <p className={styles.postDate}>{new Date(post.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Right side - Form */}
                <div className={styles.formContainer}>
                    <div className={styles.postForm}>
                        <input
                            type="text"
                            placeholder="Title of your story"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Write about your story..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={styles.textarea}
                        ></textarea>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Select category</option>
                            <option value="Interview Experience">Interview Experience</option>
                            <option value="Job Referral">Job Referral</option>
                            <option value="Career Advice">Career Advice</option>
                            <option value="Other">Other</option>
                            <option value="Freelance Projects">Freelance Projects</option>
                            <option value="Networking Tips">Networking Tips</option>
                            <option value="Skill Development">Skill Development</option>
                            <option value="Tech News">Tech News</option>
                            <option value="Work-Life Balance">Work-Life Balance</option>
                            <option value="Remote Work">Remote Work</option>
                            <option value="Personal Branding">Personal Branding</option>
                            <option value="Job Search Strategies">Job Search Strategies</option>
                            <option value="Industry Trends">Industry Trends</option>
                            <option value="Tech Events">Tech Events</option>
                            <option value="Workplace Culture">Workplace Culture</option>

                        </select>
                        <button onClick={handleSubmit} className={styles.submitButton}>Post Experience</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Stories;
