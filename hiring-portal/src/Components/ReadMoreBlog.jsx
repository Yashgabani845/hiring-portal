import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../CSS/readMoreBlog.css"
import profilepic from '../assests/profile.jpg';
import Footer from './Footer';
import Navbar from './Navbar';

const ReadMoreBlog = () => {
    const { id } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    // console.log(id)
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get-by-id/${id}`);
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            const data = await response.json();
            console.log('Fetched Data:', data);
            setBlogPost(data.blog); // Set the retrieved blog post to state
        } catch (error) {
            console.error('Error fetching blog post:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (!blogPost) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="read-more-page">
                <div className="blog-post">
                    <img src={profilepic} alt={`${blogPost.author}'s profile`} className="user-image" />
                    <h1 className="blog-post__title">{blogPost.title}</h1>
                    <div className="blog-post__meta">
                        <span className="author">{blogPost.author}</span>
                        <span className="date">{blogPost.date}</span>
                    </div>
                    <p className="blog-post__content">{blogPost.content}</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadMoreBlog;
