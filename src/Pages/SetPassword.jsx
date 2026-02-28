import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SetPassword.css";

const SetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/set-password",
        {
          email,
          newPassword,
        }
      );

      setMsg(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMsg(
        err.response?.data?.message || "Something went wrong, try again"
      );
    }
  };

  return (
    <div className="setpass-container">
      <div className="setpass-card">
        <h2>Set Your Password</h2>
        <p>Enter your registered email and create a new password</p>

        {msg && (
          <p className={msg.includes("success") ? "success-msg" : "error-msg"}>
            {msg}
          </p>
        )}

        <form className="setpass-form" onSubmit={handleSetPassword}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Set new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="setpass-btn" type="submit">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
