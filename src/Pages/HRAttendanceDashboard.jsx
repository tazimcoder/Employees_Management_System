import React from "react";
import "./HRAttendanceDashboard.css";

const HRAttendanceDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h2>HR Employee Attendance Details Dashboard</h2>

      <div className="top-dashboard-container">

        <div className="mini-card">
          <p className="card-title">Total HR Employees</p>
          <h2>12</h2>
        </div>

        <div className="mini-card">
          <p className="card-title">Present Today</p>
          <h2>9</h2>
        </div>

        <div className="mini-card">
          <p className="card-title">Absent Today</p>
          <h2>3</h2>
        </div>

        <div className="mini-card">
          <p className="card-title">Absentee Rate</p>
          <h2>25%</h2>
        </div>

      </div>
    </div>
  );
};

export default HRAttendanceDashboard;