import { DashboardOutlined } from "@mui/icons-material";
import Dashboard from "../pages/Dashboard";
import CreateEvent from "../pages/CreateEvent";

export const userRoutes = [
  {
    icon: DashboardOutlined,
    label: "Dashboard",
    href: "/dashboard",
    component: Dashboard,
  },
  {
    icon: DashboardOutlined,
    label: "Create Event",
    href: "/create-event",
    component: CreateEvent,
  },
];
