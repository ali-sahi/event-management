import { DashboardOutlined } from "@mui/icons-material";
import Dashboard from "../pages/Dashboard";
import ManageUsers from "../pages/ManageUsers";

export const adminRoutes = [
  {
    icon: DashboardOutlined,
    label: "Dashboard",
    href: "/dashboard",
    component: Dashboard,
  },
  {
    icon: DashboardOutlined,
    label: "Manage",
    href: "/manage-users",
    component: ManageUsers,
  },
];
