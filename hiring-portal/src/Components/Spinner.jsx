import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the viewport
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background
        position: "fixed", // Keeps spinner in place
        width: "100%", // Full width
        top: 0, // Aligns to the top
        left: 0, // Aligns to the left
        zIndex: 1000, // Makes sure it is above other content
        gap: "1rem",
      }}
    >
      <p style={{ fontSize: "20px" }}>Checking Authentication</p>{" "}
      <CircularProgress size={60} thickness={5} />{" "}
      {/* Customize size and thickness here */}
    </Box>
  );
};

export default Spinner;
