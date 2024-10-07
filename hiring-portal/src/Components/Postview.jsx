import React from "react";
import "../CSS/postview.css";
import postImg from "../assests/3rdone.jpg";

const PostView = () => {
  return (
    <div className="postview">
      <div className="post-img">
        <img src={postImg} alt="Post a Job" />
      </div>
      <div className="ptext-part ">
        <h1>Post Your Job Opening Today!</h1>
        <p>
          Reach thousands of qualified candidates by posting your job on our
          platform.
        </p>
        <button className="post-btn">Post a Job</button>
      </div>
    </div>
  );
};

export default PostView;
