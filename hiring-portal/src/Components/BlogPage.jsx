import { useState, useEffect } from "react";
import '../CSS/blog.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import profilepic from '../assests/profile.jpg';
import axios from "axios";


// const blogData = [
//     {
//         id: 1,
//         title: "How to Ace Your Tech Interview",
//         author: "Amit Kumar",
//         date: "Oct 1, 2024",
//         content: "Cracking a tech interview involves a combination of technical knowledge, problem-solving skills, and communication. Start by mastering data structures and algorithms, focus on core programming languages, and practice mock interviews. Remember, confidence is key—present your solutions clearly and explain your thought process step by step.",
//         userImage: profilepic, // Replace with dynamic user image
//     },
//     {
//         id: 2,
//         title: "Top Skills to Have in 2024",
//         author: "Sneha Sharma",
//         date: "Sep 25, 2024",
//         content: "In 2024, the most sought-after skills include artificial intelligence, machine learning, and cloud computing. Companies are also looking for professionals adept in cybersecurity, data science, and full-stack development. Upskilling in these areas will give you a competitive edge in the tech industry.",
//         userImage: profilepic, // Replace with dynamic user image
//     },
//     {
//         id: 3,
//         title: "Building a Successful Tech Career",
//         author: "Ravi Patel",
//         date: "Sep 18, 2024",
//         content: "A successful tech career is built on continuous learning and adaptability. Keep up with industry trends, embrace new technologies, and develop both hard and soft skills. Networking and finding mentors in the field can help you navigate challenges and accelerate your growth.",
//         userImage: profilepic, // Replace with dynamic user image
//     },
//     {
//         id: 4,
//         title: "Mastering Machine Learning in 2024",
//         author: "Priya Mehta",
//         date: "Aug 30, 2024",
//         content: "Machine learning is at the forefront of tech innovation. To excel, start by understanding fundamental algorithms like linear regression and decision trees. Experiment with real-world datasets and frameworks like TensorFlow and PyTorch. Stay updated with new advancements in AI to keep your skills sharp.",
//         userImage: profilepic, // Replace with dynamic user image
//     },
//     {
//         id: 5,
//         title: "How Blockchain is Changing Healthcare",
//         author: "Rajesh Verma",
//         date: "Aug 15, 2024",
//         content: "Blockchain technology is revolutionizing healthcare by providing secure patient data management and streamlining healthcare operations. Smart contracts and decentralized data storage ensure privacy and reduce inefficiencies. Explore how blockchain can improve trust and transparency in healthcare services.",
//         userImage: profilepic, // Replace with dynamic user image
//     },
// {
//     id: 6,
//     title: "Navigating Remote Work as a Developer",
//     author: "Anjali Nair",
//     date: "Jul 20, 2024",
//     content: "Remote work has become the new norm for many developers. Success in a remote environment requires self-discipline, effective communication, and the right tools. Establishing a structured routine and maintaining work-life balance can help you stay productive and avoid burnout.",
//     userImage: profilepic, // Replace with dynamic user image
// },
// ];

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
        <div className="blog-card">
            <div className="blog-card__header">
                <img src={profilepic} alt={blog.title} className="blog-card__image" />
                <div className="blog-card__info">
                    <h2 className="blog-card__title">{blog.title}</h2>
                    <p className="blog-card__meta">
                        By {blog.author} • {formatDate(blog.date)}
                    </p>
                </div>
            </div>
            <div className="blog-card__content">
                <p className="blog-card__description">
                    {blog.content.slice(0, 100)}...
                </p>
                <div>
                    <Link to={`/read-more-blog/${blog._id}`} className="blog-card__button">Read More</Link>
                    <button className="blog-card__button" onClick={() => deleteBlog(blog._id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};


const BlogList = ({ blogs }) => {
    return (
        <div className="blog-list">
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
            <div className="blog-page">
                <div className="header">
                    <h1 className="blog-page__title">Latest Blogs</h1>
                    <div>

                        <button className="create-blog-button" onClick={() => {
                            navigate("/create-blog")
                        }}>Create Blog</button>
                        {blogs.length > 0 &&
                            <button className="delete-blog-button" onClick={handleDeleteAll}>Delete All</button>}
                    </div>
                </div>
                {blogs.length > 0 ? <BlogList blogs={blogs} /> : <p>No blog to show...</p>}
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
