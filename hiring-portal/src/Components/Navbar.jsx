import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../CSS/navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LaunchIcon from '@mui/icons-material/Launch';
import logo from "../logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 

  return (
    <div className="navbar">
      <div className="logo"><img className="logoimg" src={logo} alt="Logo" /></div>
      <div className="icons">
        <div className="icon home">
          <HomeIcon />
          <Link to="/"><span>Home</span></Link>
        </div>
        <div className="icon jobs">
          <WorkIcon />
          <Link to="/jobcard"><span>Jobs</span></Link>
        </div>
        <div className="icon aboutus">
          <InfoIcon />
          <Link to="/about"><span>About</span></Link>
        </div>
        <div className="icon login">
          {isLoggedIn ? (
            <>
              <AccountCircleIcon />
              <Link to="/profile"><span>Profile</span></Link>
            </>
          ) : (
            <>
              <LoginIcon />
              <Link to="/signup"><span>Login</span></Link>
            </>
          )}
        </div>
      </div>
      <div className="posting">
        <span>Employer/Post Job</span>
        <LaunchIcon className="posting-icon" />
      </div>
    </div>
  );
};

export default Navbar;
