import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';  
import LazyLoad from 'react-lazyload';

import "../CSS/navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LaunchIcon from '@mui/icons-material/Launch';
import logo from "../logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('/');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
    setActiveTab(location.pathname); 
  }, [location.pathname]);

  const handlePostJob = () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      axios.get('https://hirebackend-1.onrender.com/api/users/profile', {
        params: { email }
      })
      .then(response => {
        const { role } = response.data;
        navigate("/owner");
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
    } 
  }

  return (
    <div className="navbar">
      <div className="logo">
        <LazyLoad height={40} offset={100} once>
          <img className="logoimg" src={logo} alt="Logo" />
        </LazyLoad>
      </div>
      <div className="icons">
        <div className={`icon home ${activeTab === '/' ? 'active' : ''}`}>
          <HomeIcon />
          <Link to="/" onClick={() => setActiveTab('/')}><span>Home</span></Link>
        </div>
        <div className={`icon jobs ${activeTab === '/jobcard' ? 'active' : ''}`}>
          <WorkIcon />
          <Link to="/jobcard" onClick={() => setActiveTab('/jobcard')}><span>Jobs</span></Link>
        </div>
        <div className={`icon aboutus ${activeTab === '/about' ? 'active' : ''}`}>
          <InfoIcon />
          <Link to="/about" onClick={() => setActiveTab('/about')}><span>About</span></Link>
        </div>
        <div className={`icon login ${activeTab === '/profile' ? 'active' : ''}`}>
          {isLoggedIn ? (
            <>
              <AccountCircleIcon />
              <Link to="/profile" onClick={() => setActiveTab('/profile')}><span>Profile</span></Link>
            </>
          ) : (
            <>
              <LoginIcon />
              <Link to="/signin" onClick={() => setActiveTab('/signin')}><span>Login</span></Link>
            </>
          )}
        </div>
      </div>
      <div className="posting">
        <span onClick={handlePostJob}>Employer/Post Job</span>
        <LaunchIcon className="posting-icon" />
      </div>
    </div>
  );
};

export default Navbar;
