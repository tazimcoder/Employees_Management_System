// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";

import Home from "./Pages/Home";
import DashboardPage from "./Pages/DashboardPage";
import Employees from "./Pages/Employees";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployees from "./Pages/EditEmployees";
import HRAttendanceDashboard from "./Pages/HRAttendanceDashboard";
import Login from "./Pages/Login";
import SetPassword from "./Pages/SetPassword";
import HRPanel from "./Pages/HRPanel";

function App() {
  const location = useLocation();

  // ✅ Show footer only on Home routes
  const showFooter =
    location.pathname === "/" ||
    location.pathname === "/home";

  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-password" element={<SetPassword />} />

        {/* Dashboard - HR & Employee both */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["hr", "employee"]}>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* HR Only Routes */}
        <Route
          path="/hr-panel"
          element={
            <PrivateRoute allowedRoles={["hr"]}>
              <HRPanel />
            </PrivateRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <PrivateRoute allowedRoles={["hr"]}>
              <Employees />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <PrivateRoute allowedRoles={["hr"]}>
              <AddEmployee />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <PrivateRoute allowedRoles={["hr"]}>
              <EditEmployees />
            </PrivateRoute>
          }
        />

        <Route
          path="/hr-attendance-dashboard"
          element={
            <PrivateRoute allowedRoles={["hr"]}>
              <HRAttendanceDashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* ✅ Show Footer only on Home */}
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
