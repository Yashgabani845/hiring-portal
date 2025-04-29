import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import LazyLoad from "react-lazyload";
import styles from "../CSS/navbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LaunchIcon from "@mui/icons-material/Launch";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assests/logo.png";
import { FaBlog } from "react-icons/fa";
import { Dock } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const [hideElements, setHideElements] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setActiveTab(location.pathname);

    const routesToHideElements = ["/signin", "/signup"];
    setHideElements(routesToHideElements.includes(location.pathname));
  }, [location.pathname]);

  const handlePostJob = () => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios
        .get(`http://localhost:5000/api/users/profile/${email}`        
        )
        .then((response) => {
          const { role } = response.data;
          navigate("/owner");
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          toast.error("Please log in to continue", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.error("Please log in to continue", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.navbar}>
      <ToastContainer />

      <div className={styles.header}>
        <div className={styles.hirehublogo}>
          <LazyLoad height={40} offset={100} once>
            <Link to="/">
              <img className={styles.logoimg} src={logo} alt="Logo" />
            </Link>
          </LazyLoad>
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>

      <div className={`${styles.icons} ${menuOpen ? styles.showMenu : ""}`}>
        <div
          className={`${styles.icon} ${activeTab === "/" ? styles.active : ""}`}
        >
          <Link to="/">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </div>

        {!hideElements && (
          <>
            <div
              className={`${styles.icon} ${activeTab === "/jobcard" ? styles.active : ""
                }`}
            >
              <Link to="/jobcard">
                <WorkIcon />
                <span>Jobs</span>
              </Link>
            </div>

            <div
              className={`${styles.icon} ${activeTab === "/about" ? styles.active : ""
                }`}
            >
              <Link to="/about">
                <InfoIcon />
                <span>About</span>
              </Link>
            </div>

            
           


            {/* Explore dropdown menu */}
            <div className={styles.dropdown}>
              <div className={styles.icon}>
                <span>Explore</span>
              </div>
              <div className={styles.dropdownContent}>
                <div
                  className={`${styles.icon} ${activeTab === "/resume-analyzer" ? styles.active : ""
                    }`}
                >
                  <Link to="/resume-analyzer">
                    <Dock />
                    <span>Scan Resume</span>
                  </Link>
                </div>
                <div
                  className={`${styles.icon} ${activeTab === "/resume-screening" ? styles.active : ""
                    }`}
                >
                  <Link
                    to="/resume-screening"
                    onClick={() => setActiveTab("/resume-analyzer")}
                  >
                    <Dock />
                    <span >Resume Screening</span>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={`${styles.icon} ${activeTab === "/profile" ? styles.active : ""
                }`}
            >
              {isLoggedIn ? (
                <Link to="/profile">
                  <AccountCircleIcon />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link to="/signin">
                  <LoginIcon />
                  <span>Login</span>
                </Link>
              )}
            </div>
            <div className={styles.posting} onClick={handlePostJob}>
              <span>Employer/Post Job</span>
              <LaunchIcon className={styles.postingIcon} />
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
