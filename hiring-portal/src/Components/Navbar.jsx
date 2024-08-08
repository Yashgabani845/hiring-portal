import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
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
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);
  const handlePostJob = () => {
   
    const email = localStorage.getItem('userEmail');
    if (email) {
      axios.get('http://localhost:5000/api/users/profile', {
        params: { email }
      })
      .then(response => {
        const { role } = response.data;
        if (role === 'owner') {
          navigate("/owner");
        } else {
          navigate("/company");
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
    } 
  }


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
              <Link to="/signin"><span>Login</span></Link>
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
