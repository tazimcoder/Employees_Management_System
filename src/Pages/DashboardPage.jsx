import React, { useEffect, useState } from "react";
import axios from "axios";
import './DashboardPage.css';

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // ✅ 1. Get logged-in user details from /api/auth/me
        const resUser = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(resUser.data);

        // ✅ 2. If HR, get all employees
        if (user.role === "hr") {
          const resEmployees = await axios.get("http://localhost:5000/api/employees", {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Include HR's own data in the employees list
          const allEmployees = [resUser.data, ...(resEmployees.data.data || [])];
          setEmployees(allEmployees);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Backend might be down or token expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(
        `http://localhost:5000/api/employees/role/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, role } : emp))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update role.");
    }
  };

  // Pagination for HR employees
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  if (loading) return <h2 className="loading-text">Loading Dashboard...</h2>;

  return (
    <div className="dashboard-page">
      <h2>Employee Dashboard</h2>

      {!user && <p style={{ color: "red" }}>Please login to view dashboard</p>}

      {userData && (
        <div className="user-card">
          <h3>My Details</h3>
          <div className="info-grid">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone || "Not Available"}</p>
            <p><strong>Department:</strong> {userData.position || "Not Available"}</p>
            <p><strong>Address:</strong> {userData.address || "Not Available"}</p>
            <p><strong>Salary:</strong> {userData.salary ? `₹ ${userData.salary}` : "Not Available"}</p>
          </div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* HR sees employees list (including their own data) */}
      {user && user.role === "hr" && employees.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <table className="employee-table" border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp.id || emp._id}> {/* Use _id if MongoDB */}
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    <select
                      value={emp.role}
                      onChange={(e) => handleRoleChange(emp.id || emp._id, e.target.value)}
                    >
                      <option value="employee">Employee</option>
                      <option value="hr">HR</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({
              length: Math.ceil(filteredEmployees.length / employeesPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* HR has no employees */}
      {user && user.role === "hr" && employees.length === 0 && (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default DashboardPage;