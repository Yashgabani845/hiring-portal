import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import "../CSS/navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LaunchIcon from '@mui/icons-material/Launch';
import logo from "../logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('/');
  const [hideElements, setHideElements] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setActiveTab(location.pathname);

    const routesToHideElements = ['/signin', '/signup'];
    setHideElements(routesToHideElements.includes(location.pathname));
  }, [location.pathname]);

  const handlePostJob = () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      axios.get('http://localhost:5000/api/users/profile', {
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
  };

  return (
    <div className="navbar">
      <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
      <div className="hirehublogo">
        <LazyLoad height={40} offset={100} once>
          <Link to={'/'} onClick={toggleMenu}><img className="logoimg" src={logo} alt="Logo" /></Link>
        </LazyLoad>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <CloseIcon style={{ fontSize: '2rem' }} /> : <MenuIcon style={{ fontSize: '2.5rem' }} />}
      </div>

      <div className={`icons ${menuOpen ? 'open' : ''}`}>
        <div className={`m-auto layout ${menuOpen ? 'open' : ''}`}>
          <div className={`icon home ${activeTab === '/' ? 'active' : ''}`}>
            <HomeIcon />
            <Link to="/" onClick={() => { setActiveTab('/'); toggleMenu(); }}>
              <span>Home</span>
            </Link>
          </div>

          {!hideElements && (
            <>
              <div className={`icon jobs ${activeTab === '/jobcard' ? 'active' : ''}`}>
                <WorkIcon />
                <Link to="/jobcard" onClick={() => { setActiveTab('/jobcard'); toggleMenu(); }}>
                  <span>Jobs</span>
                </Link>
              </div>

              <div className={`icon aboutus ${activeTab === '/about' ? 'active' : ''}`}>
                <InfoIcon />
                <Link to="/about" onClick={() => { setActiveTab('/about'); toggleMenu(); }}>
                  <span>About</span>
                </Link>
              </div>

              <div className={`icon login ${activeTab === '/profile' ? 'active' : ''}`}>
                {isLoggedIn ? (
                  <>
                    <AccountCircleIcon />
                    <Link to="/profile" onClick={() => { setActiveTab('/profile'); toggleMenu(); }}>
                      <span>Profile</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <LoginIcon />
                    <Link to="/signin" onClick={() => { setActiveTab('/signin'); toggleMenu(); }}>
                      <span>Login</span>
                    </Link>
                  </>
                )}
              </div>
            </>
          )}

          {!hideElements && (
            <div className="posting">
              <span onClick={handlePostJob}>Employer/Post Job</span>
              <LaunchIcon className="posting-icon" />
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Navbar;



