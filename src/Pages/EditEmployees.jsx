import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployee, updateEmployee } from "../services/employeeservice";

const EditEmployees = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    address: "",
    salary: ""
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getEmployee(id);
        const emp = res.data;

        setForm({
          name: emp.name || "",
          email: emp.email || "",
          department: emp.position || "", // IMPORTANT
          phone: emp.phone || "",
          address: emp.address || "",
          salary: emp.salary || ""
        });
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      position: form.department, // IMPORTANT (matches DB)
      phone: form.phone,
      address: form.address,
      salary: form.salary || null
    };

    console.log("Sending update:", payload);

    try {
      await updateEmployee(id, payload);
      alert("Employee updated successfully");
      navigate("/employees");   // ✅ FIXED PATH
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", color: "black" }}>
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEmployees;
