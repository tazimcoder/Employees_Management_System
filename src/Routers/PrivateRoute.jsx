// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, children }) => {
  // ✅ Safely parse user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // If user not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role not allowed → redirect to Home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Allowed → render children
  return children;
};

export default PrivateRoute;
