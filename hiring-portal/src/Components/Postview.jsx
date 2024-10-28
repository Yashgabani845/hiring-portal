import React from "react";
import styles from "../CSS/postview.module.css";
import postImg from "../assests/3rdone.jpg";

const PostView = () => {
  return (
    <div className={styles.postView}>
      <div className={styles.postImg} data-aos="fade-right">
        <img src={postImg} alt="Post a Job" />
      </div>
      <div className={styles.ptextPart} data-aos="fade-left">
        <h1>Post Your Job Opening Today!</h1>
        <p>
          Reach thousands of qualified candidates by posting your job on our
          platform.
        </p>
        <button className={styles.postBtn}>Post a Job</button>
      </div>
    </div>
  );
};

export default PostView;
