import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#222",
        color: "white",
      }}
    >
      <h3>Employee Management</h3>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

        {/* ALWAYS VISIBLE */}
        <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        {/* ONLY AFTER LOGIN */}
        {token && (
          <>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
              Dashboard
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* ONLY BEFORE LOGIN */}
        {!token && (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
