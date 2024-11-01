import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../CSS/herosection.module.css';

import LocationOnIcon from "@mui/icons-material/LocationOn";

const HeroSection = () => {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/search?keywords=${encodeURIComponent(
          keywords
        )}&location=${encodeURIComponent(location)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  useEffect(() => {
    if (keywords || location) {
      const timerId = setTimeout(handleSearch, 300);
      return () => clearTimeout(timerId);
    } else {
      setSearchResults([]);
    }
  }, [keywords, location]);

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className={styles.heroSection} data-aos="zoom-in" data-aos-duration="2000">
      <div className={styles.heroContent}>
        <h1>Find Your Dream Job</h1>
        <p>
          Explore Thousands of job opportunities and connect with top employers.
        </p>
      </div>
      <center className={styles.center}>
        <div className={styles.searchBar}>
          <div className={styles.searchDiv}>
            <searchIcon className={styles.searchIcon} />
            <input
              type="text"
              className={styles.search}
              placeholder="Job title, Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div className={styles.separate}>|</div>
          <div className={styles.searchDiv}>
            <LocationOnIcon className={styles.locationIcon} />
            <input
              type="text"
              className={styles.search}
              placeholder="Search by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button className={styles.searchBtn} onClick={handleSearch}>
            Find
          </button>
        </div>
      </center>

      <div className={styles.searchResults}>
        {searchResults.length > 0 ? (
          searchResults.map((job) => (
            <div
              key={job._id}
              className={styles.jobItem}
              onClick={() => handleJobClick(job._id)}
            >
              <h3>{job.title}</h3>
              <p>{job.workLocation}</p>
            </div>
          ))
        ) : (
          <p style={{ display: "none" }}>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;