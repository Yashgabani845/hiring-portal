import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import styles from "../CSS/SigninWithGoogle.module.css";

const SignInWithGoogle = () => {
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Save user's email to local storage if they are signed in
      if (currentUser) {
        localStorage.setItem("userEmail", currentUser.email);
      } else {
        // localStorage.removeItem("userEmail");
      }
    });
    return unsubscribe;
  }, []);

  // Handle Google sign-in
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
        // Save user's email to local storage on successful sign-in
        localStorage.setItem("userEmail", result.user.email);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  // Handle sign-out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        // Remove user's email from local storage on sign-out
        localStorage.removeItem("userEmail");
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  return (
    <div className={styles.container}>
      {!user ? (
        <>
          {/* Sign in with Google button */}
          <button onClick={signInWithGoogle} className={styles.button}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google Logo"
              className={styles.googleLogo}
            />
            Sign in with Google
          </button>
        </>
      ) : (
        <>
          {/* Auth status and profile view */}
          <div className={styles.authStatus}>
            <p>Welcome, {user.displayName}</p>
            <div className={styles.actionButton}>
              <button
                onClick={() => {
                  const name = user.displayName
                    ? encodeURIComponent(user.displayName)
                    : "unknown";
                  const email = user.email
                    ? encodeURIComponent(user.email)
                    : "unknown";
                  const profilePic = user.photoURL
                    ? encodeURIComponent(user.photoURL)
                    : "";
                  window.location.href = `/profile?name=${name}&email=${email}&profilePic=${profilePic}`;
                }}
                className={styles.viewProfileButton}
              >
                View Profile
              </button>

              {/* Sign out button */}
              <button onClick={handleSignOut} className={styles.signOutButton}>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignInWithGoogle;
