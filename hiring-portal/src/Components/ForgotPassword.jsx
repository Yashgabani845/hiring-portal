import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import "../CSS/signin.css";

const PasswordResetPage = () => {
  const { email } = useParams(); // Get email from the URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Reset the password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    try {
      // Call API to reset the password
      const response = await fetch(
        `http://localhost:5000/api/DirectResetPassword/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ NewPassword: password }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Password has been reset successfully!");
        console.log("done");

        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "Error resetting password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="password-reset-container"
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Reset Password</h2>
      <form
        onSubmit={handleResetPassword}
        className="signin-form-forgotpassword"
      >
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="form-control"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PasswordResetPage;
