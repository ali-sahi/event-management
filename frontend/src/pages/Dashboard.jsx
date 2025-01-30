import React from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const user = "user";
  return <>{user === "admin" ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default Dashboard;
