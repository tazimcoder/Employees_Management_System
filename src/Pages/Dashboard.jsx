// import React, { useEffect, useState } from "react";
// import { getMe } from "../services/authService";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getMe();
//         setUser(res.data);
//       } catch (err) {
//         console.error("Dashboard Error:", err);
//       }
//       setLoading(false);
//     };

//     fetchUser();
//   }, []);

//   if (loading)
//     return <h2 className="loading-text">Loading your dashboard...</h2>;

//   if (!user)
//     return <h2 className="loading-text">No user data found</h2>;

//   return (
//     <div className="dashboard-container">
//       <h2>My Dashboard</h2>

//       <div className="user-card">
//         <h3>User Details</h3>

//         <div className="info-grid">
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phone || "Not Available"}</p>
//           <p><strong>Department:</strong> {user.position || "Not Available"}</p>
//           <p><strong>Address:</strong> {user.address || "Not Available"}</p>
//           <p><strong>Salary:</strong> {user.salary ? `₹ ${user.salary}` : "Not Available"}</p>
//           <p>
//             <strong>Joined:</strong>{" "}
//             {user.created_at
//               ? new Date(user.created_at).toLocaleDateString()
//               : "Not Available"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
