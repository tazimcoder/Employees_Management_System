import React from "react";
import { Link } from "react-router-dom";

const EmployeeCard = ({ employee }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const department = employee.position || "Not Available";
  const joinedDate = employee.created_at || employee.createdAt || employee.date;

  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>

      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Phone:</strong> {employee.phone || "Not Available"}</p>
      <p><strong>Address:</strong> {employee.address || "Not Available"}</p>
      <p><strong>Salary:</strong> {employee.salary ? `₹ ${employee.salary}` : "Not Available"}</p>

      <p>
        <strong>Joined:</strong>{" "}
        {joinedDate
          ? new Date(joinedDate).toLocaleDateString()
          : "Not Available"}
      </p>

      {user?.role === "admin" && (
        <Link to={`/edit-employee/${employee.id}`} className="edit-link">
          Edit
        </Link>
      )}
    </div>
  );
};

export default EmployeeCard;
