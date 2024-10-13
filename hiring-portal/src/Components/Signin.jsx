import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import "../CSS/signin.css";
import jobImage from "../assests/job_search.png"; // Replace with the actual path to your image
import logo from "../assests/logo.png";
import { ClipLoader } from "react-spinners"; // Import the spinner
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import { Modal, Input, Button } from "antd";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true); // Loader state
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Sign in successful:", data);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("token", data.token);
        toast.success("Sign in successful!");
        if (email === "admin@gmail.com" && password === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        console.error("Sign in failed:", data.message);
        toast.error(`Sign in failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const showForgotPasswordModal = () => {
    setIsForgotPasswordModalVisible(true);
  };

  // call the api to send email

  const handleForgotPasswordOk = async () => {
    if (!forgotPasswordEmail) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/SendResetEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserEmail: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent!");
        setIsForgotPasswordModalVisible(false); // Close the modal after success
      } else {
        toast.error(data.message || "Failed to send password reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending the password reset link.");
    }
  };

  const handleForgotPasswordCancel = () => {
    setIsForgotPasswordModalVisible(false);
  };
  return (
    <div className="bg">
      <Navbar />
      {loadingImage && (
        <div className="loader-overlay">
          <ClipLoader color="#3498db" loading={loadingImage} size={50} />
        </div>
      )}
      <div className="signin-page">
        <center>
          <div className="welcom1">
            <h1>Welcome to&nbsp;&nbsp;</h1>
            <img src={logo} alt="Logo" />
          </div>
        </center>
        <div className="signin-data">
          <div className="signin-image">
            <img
              src={jobImage}
              alt="Job Portal"
              onLoad={() => setLoadingImage(false)}
              onError={() => setLoadingImage(false)}
              style={{ display: loadingImage ? "none" : "block" }}
            />
          </div>
          <div className="signin-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle input type between text and password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span onClick={togglePasswordVisibility} className="eye-icon">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="submit">Sign In</button>
                <button type="button" onClick={showForgotPasswordModal}>
                  Forgot Password
                </button>
              </div>
              <div className="remember-forgot">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
              </div>
            </form>
            <div className="extra-options">
              <a href="/signup">Don't have an account? Sign Up</a>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Forgot Password"
        visible={isForgotPasswordModalVisible}
        onOk={handleForgotPasswordOk}
        onCancel={() => setIsForgotPasswordModalVisible(false)}
      >
        <Input
          placeholder="Enter your email"
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
