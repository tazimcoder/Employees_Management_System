// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);

      // Store token & user safely
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // ✅ Redirect to Home after login
      navigate("/");
    } catch (err) {
      setError(
        "Invalid email or password (Not a registered employee)"
      );
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login Clicked (you can integrate Firebase later)");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Employee Management System</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p
            className="forgot"
            onClick={() => navigate("/set-password")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            First Time? Set Your Password
          </p>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/512px-Google_%22G%22_logo.svg.png"
              alt="google"
            />
            Continue with Google
          </button>

          <button
            type="button"
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Go to Home Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
