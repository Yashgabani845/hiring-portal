import React from "react";
import "../CSS/navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LaunchIcon from '@mui/icons-material/Launch';
import logo from "../logo.png"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo"><img className="logoimg" src={logo} alt="" /></div>
      <div className="icons">
        <div className="icon home">
          <HomeIcon />
          <a href=""><span>Home</span></a>
        </div>
        <div className="icon jobs">
          <WorkIcon />
          <a href="/jobcard"> <span>Jobs</span></a>
        </div>
        <div className="icon aboutus">
          <InfoIcon />
          <a href=""> <span>About</span></a>
        </div>
        <div className="icon login">
          <LoginIcon />
          <a href="/signup"> <span>Login</span></a>
        </div>
      </div>
      <div className="posting">
      <span>Employer/Post Job   </span>
        <LaunchIcon className="posting-icon" />
        
      </div>
    </div>
  );
};

export default Navbar;
