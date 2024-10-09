import React, { useState, useEffect } from "react";
import "../CSS/backtotop.css";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down by 100px
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the window to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Effect to add and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`back-to-top-container ${isVisible ? "visible" : "hidden"}`}
    >
      <button
        className="BackToTopBtn"
        onClick={scrollToTop}
        aria-label="Back to Top"
      >
        &#8679;
      </button>
    </div>
  );
};

export default BackToTop;
