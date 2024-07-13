import React from "react";
import "../CSS/herosection.css"; 
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Find Your Dream Job</h1>
        <p>Explore Thousands of  job opportunities and connect with top employers.</p>
        </div>
       <center>
        <div className="search-bar">
          <div className="searchdiv">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              className="search"
              placeholder="Job title,Keywords"
              name=""
              id=""
            />
          </div>
          <div className="seprate">|</div>
          <div className="searchdiv">
            <LocationOnIcon className="location-icon" />
            <input
              type="text"
              className="search"
              placeholder="Search by location"
              name=""
              id=""
            />
          </div>
          <button className="searchbtn">Find</button>
        </div>
        </center>
   
      
    </div>
    
  );
};

export default HeroSection;
