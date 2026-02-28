import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../services/employeeservice";
const AddEmployee = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    address: "",
    salary: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      position: form.department, // Backend field
      phone: form.phone,
      address: form.address,
      salary: form.salary || null
    };

    console.log("Adding employee:", payload);

    try {
      const res = await addEmployee(payload);
      console.log("Server response:", res.data);

      alert("Employee Added Successfully");

      navigate("/employees"); // <-- SMALL LETTER ROUTE

    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to Add Employee");
    }
  };

  return (
    <div className="add-employee" style={{color: "black"}}>
      <h2>Add Employee</h2>
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
          required
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEmployee;
