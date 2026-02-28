import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 IMPORTANT — Har request ke saath token bhejo
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEmployees = () => api.get("/employees");
export const getEmployee = (id) => api.get(`/employees/${id}`);
export const addEmployee = (data) => api.post("/employees", data);
export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
