import React, { useState } from 'react';
import "../CSS/signin.css"
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Remember Me:', rememberMe);
    };
  
    return (
      <div className="signin-container">
        <div className="signin-card">
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
            <div className="form-group remember-me">
        
             
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button type="submit">Sign In</button>
          </form>
          <div className="extra-options">
           
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignIn;