import { useState, useEffect } from "react";
import styles from "../CSS/blog.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import profilepic from "../assests/profile.jpg";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../assests/emptyanimation.json";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";

const deleteBlog = async (id) => {
  try {
    console.log("Deleting blog with ID:", id);
    await axios.delete(`http://localhost:5000/api/delete-by-id/${id}`);
    alert("Blog deleted successfully");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const BlogCard = ({ blog }) => (
  <div className={styles.blogCard}>
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
        <Link
          to={`/read-more-blog/${blog._id}`}
          className={styles.blogCardButton}
        >
          Read More
        </Link>
        <button
          className={styles.blogCardButton}
          onClick={() => deleteBlog(blog._id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const BlogSkeleton = () => (
  <div className={styles.blogCard}>
    <div className={styles.blogCardHeader}>
      <Skeleton variant="circular" width={40} height={40} />
      <div className={styles.blogCardInfo}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <div className={styles.blogCardContent}>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rectangular" width="100%" height={40} />
    </div>
  </div>
);

const BlogList = ({ blogs, totalBlogs, currentPage, onPageChange }) => (
  <div className={styles.blogList}>
    {blogs.map((blog) => (
      <BlogCard key={blog._id} blog={blog} />
    ))}
    <Pagination
      count={Math.ceil(totalBlogs / 3)}
      page={currentPage}
      onChange={onPageChange}
    />
  </div>
);

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTotalBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get-total-blogs"
      );
      setTotalBlogs(response.data.totalblogs);
    } catch (err) {
      console.error("Error fetching total blogs:", err);
    }
  };

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      let response = await fetch(
        `http://localhost:5000/api/all-blog/${page - 1}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:5000/api/delete-all");
      alert("All blogs deleted");
      fetchData(currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotalBlogs();
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <>
      <Navbar />
      <div className={styles.blogPage}>
        <div
          className={styles.header}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className={styles.title}>Latest Blogs</h1>
          <div>
            <button
              className={styles.createBlogButton}
              onClick={() => navigate("/create-blog")}
            >
              Create Blog
            </button>

            {blogs.length > 0 && (
              <button
                className={styles.deleteBlogButton}
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <div className={styles.blogList}>
            {[...Array(3)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <BlogList
            blogs={blogs}
            totalBlogs={totalBlogs}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Lottie options={defaultOptions} height={250} width={200} />
            <p>No blog to show...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
