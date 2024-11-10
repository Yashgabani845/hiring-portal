import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import "../CSS/signin.css";
import jobImage from "../assests/job_search.png";
import logo from "../assests/logo.png";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Modal, Input, Button } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);

  // New states for multi-step password reset
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // Track current step in the reset process

  // State for Backdrop loading
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);

  // Sign In logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBackdrop(true); // Show backdrop loader

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
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("token", data.token);
        toast.success("Sign in successful!");
        navigate(
          email === "admin@gmail.com" && password === "admin" ? "/admin" : "/"
        );
      } else {
        toast.error(`Sign in failed: ${data.message}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoadingBackdrop(false); // Hide backdrop loader
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showForgotPasswordModal = () => {
    setIsForgotPasswordModalVisible(true);
    setCurrentStep(1); // Reset to first step when modal opens
  };

  // Step 1: Request OTP
  const handleForgotPasswordRequest = async () => {
    if (!forgotPasswordEmail) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/request-password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserEmail: forgotPasswordEmail }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent! Please check your email.");
        setCurrentStep(2); // Move to next step
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the OTP.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!forgotPasswordEmail || !otp) {
      toast.error("Please enter both your email and OTP.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: forgotPasswordEmail, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified! Now enter a new password.");
        setCurrentStep(3); // Move to final step
      } else {
        toast.error(data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      toast.error("An error occurred during OTP verification.");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!forgotPasswordEmail || !otp || !newPassword) {
      toast.error("Please complete all fields to reset your password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
            otp,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Password reset successful! Please sign in with your new password."
        );
        setIsForgotPasswordModalVisible(false); // Close the modal after success
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password.");
    }
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
          <Link to="/">
            <div className="welcom1">
              <h1 data-aos="zoom-in">Welcome to&nbsp;&nbsp;</h1>
              <img src={logo} alt="Logo" data-aos="zoom-in" />
            </div>
          </Link>
        </center>
        <div className="signin-data" data-aos="zoom-in" data-aos-delay="100">
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
                    type={showPassword ? "text" : "password"}
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
              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="submit">Sign In</button>
                <button type="button" onClick={showForgotPasswordModal}>
                  Forgot Password
                </button>
              </div>
            </form>
            <div className="extra-options">
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Forgot Password"
        open={isForgotPasswordModalVisible}
        onCancel={() => setIsForgotPasswordModalVisible(false)}
        footer={null}
      >
        {currentStep === 1 && (
          <div>
            <Input
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
            <Button type="primary" onClick={handleForgotPasswordRequest}>
              Request OTP
            </Button>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button type="primary" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <Input.Password
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button type="primary" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </div>
        )}
      </Modal>

      {/* Backdrop with CircularProgress */}
      <Backdrop open={loadingBackdrop} style={{ zIndex: 10 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignIn;
