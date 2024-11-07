import React, { useEffect, useState } from "react";
import styles from "../CSS/middleview.module.css";

import jobimg from "../assests/jobs.png";
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";

const roles = [
  { role: "Software Developer", jobs: 38 },
  { role: "Data Scientist", jobs: 24 },
  { role: "Project Manager", jobs: 17 },
  { role: "UI/UX Designer", jobs: 12 },
  { role: "Marketing Specialist", jobs: 29 },
  { role: "Sales Manager", jobs: 22 },
  { role: "Product Manager", jobs: 14 },
  { role: "HR Specialist", jobs: 19 },
  { role: "Business Analyst", jobs: 31 },
  { role: "Customer Support", jobs: 20 },
];

const MiddleView = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the click event and redirect
  const handleRoleClick = () => {
    navigate("/jobcard");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Transition logic
      if (currentIndex < roles.length - 5) {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Transition to the next set
      } else {
        setCurrentIndex(0); // Reset to the start
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [currentIndex]);

  return (
    <>
      <div className={styles.middleview}>
        <div className={styles.textPart} data-aos="fade-right">
          <h1>Discover Jobs Across Popular Roles</h1>
          <center>
            <p>Select a role and we'll show you relevant jobs for it!</p>
          </center>
          <div className={styles.rolesCarousel}>
            <div className={styles.rolesList}>
              {roles.map((item, index) => (
                <div className={styles.role} key={index}>
                  <span>{item.role}</span>{" "}
                  <span className={styles.jobCount}>jobs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.jobimg} data-aos="fade-left">
          <LazyLoad height={200} offset={100} once>
            <img
              src={jobimg}
              alt="jobs"
              className={styles.jobImage}
              loading="lazy"
            />
          </LazyLoad>
        </div>
      </div>
    </>
  );
};

export default MiddleView;
