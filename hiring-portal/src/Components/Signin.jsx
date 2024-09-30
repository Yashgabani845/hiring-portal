import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../CSS/signin.css";
import jobImage from '../job_search.png'; // Replace with the actual path to your image
import logo from '../logo.png';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true); // Loader state

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      try {
        const response = await fetch('http://localhost:5000/api/users/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, rememberMe }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Sign in successful:', data);
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('token', data.token);
          toast.success('Sign in successful!');
          if(email === "admin@gmail.com" && password === "admin") {
            navigate('/admin');
          } else{
          navigate('/');
}        } else {
          console.error('Sign in failed:', data.message);
          toast.error(`Sign in failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      }
    
  };

  return (
    <div className="bg">
      {loadingImage && (
        <div className="loader-overlay">
          <ClipLoader color="#3498db" loading={loadingImage} size={50} />
        </div>
      )}
      <div className="signin-page">
        <center>
          <div className="welcom1">
            <h1>Welcome to</h1>
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
              style={{ display: loadingImage ? 'none' : 'block' }} 
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
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign In</button>
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
      <ToastContainer />
    </div>
  );
};

export default SignIn;
