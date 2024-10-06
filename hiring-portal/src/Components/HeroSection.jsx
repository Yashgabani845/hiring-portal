import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/herosection.css";
import SearchIcon from "@mui/icons-material/Search";
import LazyLoad from "react-lazyload";

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
    <div className="hero-section">
      <div className="hero-content">
        <h1>Find Your Dream Job</h1>
        <p>
          Explore Thousands of job opportunities and connect with top employers.
        </p>
      </div>
      <center className="center">
        <div className="search-bar">
          <div className="searchdiv">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              className="search"
              placeholder="Job title, Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div className="seprate">|</div>
          <div className="searchdiv">
            <LocationOnIcon className="location-icon" />
            <input
              type="text"
              className="search"
              placeholder="Search by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button className="searchbtn" onClick={handleSearch}>
            Find
          </button>
        </div>
      </center>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((job) => (
            <div
              key={job._id}
              className="job-item"
              onClick={() => handleJobClick(job._id)}
            >
              <h3>{job.title}</h3>
              <p>{job.workLocation}</p>
            </div>
          ))
        ) : (
          <p
            style={{
              display: "hidden",
            }}
          ></p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
