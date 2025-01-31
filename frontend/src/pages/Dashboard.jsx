import { useAuth } from "../providers/AuthProvider";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  const role = user.role;
  return <>{role === "admin" ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default Dashboard;
