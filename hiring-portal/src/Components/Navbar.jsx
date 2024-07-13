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
          <span>Home</span>
        </div>
        <div className="icon jobs">
          <WorkIcon />
          <span>Jobs</span>
        </div>
        <div className="icon aboutus">
          <InfoIcon />
          <span>About</span>
        </div>
        <div className="icon login">
          <LoginIcon />
          <span>Login</span>
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
