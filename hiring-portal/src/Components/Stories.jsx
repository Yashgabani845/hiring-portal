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
        const savedPosts = JSON.parse(localStorage.getItem('stories')) || [];
        setPosts(savedPosts);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && content && category) {
            const newPost = { title, content, category, date: new Date().toISOString() };
            const updatedPosts = [newPost, ...posts];
            setPosts(updatedPosts);
            localStorage.setItem('stories', JSON.stringify(updatedPosts));
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
