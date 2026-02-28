import React, { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeservice";
import EmployeeCard from "../Components/EmployeeCard";
import Loader from "../Components/Loader";   // ✅ FIXED (capital C)
import "./Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getEmployees();
        console.log("Employees from API:", res.data); // 👉 Debugging

        // ✅ FIXED: some backends return array inside res.data.data
        const data = Array.isArray(res.data) ? res.data : res.data.data;

        setEmployees(data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="employees-page">
      <h2>Employee Details</h2>

      <div className="employee-grid">
        {employees.length > 0 ? (
          employees.map(emp => (
            <EmployeeCard key={emp.id || emp._id} employee={emp} />
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default Employees;
