import { DashboardOutlined } from "@mui/icons-material";
import ManageUsers from "../pages/ManageUsers";
import Dashboard from "../pages/Dashboard";

export const adminRoutes = [
  {
    icon: DashboardOutlined,
    label: "Dashboard",
    href: "/",
    component: Dashboard,
  },
  {
    icon: DashboardOutlined,
    label: "Manage",
    href: "/manage-users",
    component: ManageUsers,
  },
];
