import { useState, useEffect } from "react";
import styles from '../CSS/blog.module.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import profilepic from '../assests/profile.jpg';
import axios from "axios";



const deleteBlog = async (id) => {
    try {
        console.log("Deleting blog with ID:", id); // Log ID
        let res = await axios.delete(`http://localhost:5000/api/delete-by-id/${id}`);
        alert('Blog deleted successfully')
        console.log(res);
        window.location.reload();

    } catch (error) {
        console.log(error)
    }
}
const formatDate = (dateString) => {
    const date = new Date(dateString);


    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

const BlogCard = ({ blog }) => {
    return (
        <div className={styles.blogCard}> {/* Updated class name to use CSS Module */}
            <div className={styles.blogCardHeader}>
                <img src={profilepic} alt={blog.title} className={styles.blogCardImage} />
                <div className={styles.blogCardInfo}>
                    <h2 className={styles.blogCardTitle}>{blog.title}</h2>
                    <p className={styles.blogCardMeta}>
                        By {blog.author} • {formatDate(blog.date)}
                    </p>
                </div>
            </div>
            <div className={styles.blogCardContent}>
                <p className={styles.blogCardDescription}>
                    {blog.content.slice(0, 100)}...
                </p>
                <div>
                    <Link to={`/read-more-blog/${blog._id}`} className={styles.blogCardButton}>Read More</Link>
                    <button className={styles.blogCardButton} onClick={() => deleteBlog(blog._id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};


const BlogList = ({ blogs }) => {
    return (
        <div className={styles.blogList}>
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            let response = await fetch('http://localhost:5000/api/all-blog')
            let data = await response.json()
            console.log('fetched data')
            // console.log(data);
            setBlogs(data.blogs)

        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteAll = async () => {
        try {
            let res = await axios.delete('http://localhost:5000/api/delete-all');
            alert('All blog deleted');
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.blogPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Latest Blogs</h1>
                    <div>
                        <button
                            className={styles.createBlogButton}
                            onClick={() => navigate("/create-blog")}
                        >
                            Create Blog
                        </button>
                        {blogs.length > 0 && (
                            <button className={styles.deleteBlogButton} onClick={handleDeleteAll}>
                                Delete All
                            </button>
                        )}
                    </div>
                </div>
                {blogs.length > 0 ? <BlogList blogs={blogs} /> : <p>No blog to show...</p>}
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;