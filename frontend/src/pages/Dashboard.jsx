import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { useAuth } from "../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useAuth();
  const role = user.role;
  return <>{role === "admin" ? <AdminDashboard /> : <UserDashboard />}</>;
};

// const Dashboard = () => {
//   return <UserDashboard />;
// };

export default Dashboard;
