import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import MiddleView from "./MiddleView";
import PostView from "./Postview";
import Footer from "./Footer";
import Interview from "./Interview";
import Testimonial from "./Testimonial";
import { ClipLoader } from "react-spinners";

const Homepage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="homepage">
            {loading && (
                <div className="spinner">
                    <ClipLoader size={50} color="#4e9ff5" />
                </div>
            )}
            <Navbar />
            <HeroSection />
            <MiddleView />
            <PostView />
            <Interview />
            <Testimonial/>
            <Footer />
        </div>
    );
};

export default Homepage;
