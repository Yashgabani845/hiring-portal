import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom"; // Import Navigate for redirecting
import Spinner from "./Components/Spinner";

export default function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if the token exists in local storage
    if (token) {
      setIsAuthenticated(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Spinner />;
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/signin
  "
    />
  ); // Redirect to login if not authenticated
}
