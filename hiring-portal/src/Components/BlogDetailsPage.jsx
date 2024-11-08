import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import loading from "../assests/loading.json";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams(); // Get the blog ID from the URL

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-by-id/${id}`
      );
      setBlog(response.data.blog); // Assuming response.data contains the blog object
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (!blog) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Lottie options={defaultOptions2} height={250} width={200} />
        <h3>Loading page...</h3>
      </div>
    ); // Show a loading message while fetching
  }

  // Convert HTML content to plain text
  const getPlainTextContent = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.innerText;
  };

  const placeholderImage =
    "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c";
  const imageUrl = blog.imageUrl || placeholderImage; // Use placeholder if no image URL is provided

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "24px",
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
        }}
      >
        <div style={{ padding: "32px 0" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {blog.title}
          </h1>
          <p style={{ color: "#555", fontSize: "14px" }}>
            Published on{" "}
            <time dateTime={blog.date}>{formatDate(blog.date)}</time> By{" "}
            {blog.author}
          </p>
        </div>

        <img
          src={imageUrl}
          alt={blog.title}
          style={{ width: "100%", height: "auto", marginBottom: "24px" }}
        />

        <div style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
          <p>{getPlainTextContent(blog.content)}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
