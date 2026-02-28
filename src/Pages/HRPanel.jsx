import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HRPanel.css";

const HRPanel = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/hr/employees`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            search,
            role: roleFilter,
            page,
            limit: 5,
          },
        }
      );

      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, roleFilter, page]);

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/hr/employees/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchEmployees();
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:5000/api/hr/employees/${selectedEmployee.id}`,
      selectedEmployee,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSelectedEmployee(null);
    fetchEmployees();
  };

  return (
    <div className="hr-container">
      <h2>HR Management Panel</h2>

      {/* 🔎 Search & Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* 🧾 Table */}
      <table className="hr-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>₹ {emp.salary}</td>
              <td>{emp.role}</td>
              <td>
                <button onClick={() => setSelectedEmployee(emp)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      {/* ✏ Edit Modal */}
      {selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Employee</h3>

            <input
              value={selectedEmployee.name}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  name: e.target.value,
                })
              }
            />

            <input
              value={selectedEmployee.email}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  email: e.target.value,
                })
              }
            />

            <select
              value={selectedEmployee.role}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  role: e.target.value,
                })
              }
            >
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
            </select>

            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setSelectedEmployee(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRPanel;