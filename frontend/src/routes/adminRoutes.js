import { CalendarViewDay, DashboardOutlined, ManageAccounts } from "@mui/icons-material";
import ManageUsers from "../pages/ManageUsers";
import ManageEvents from "../pages/ManageEvents";

export const adminRoutes = [
  {
    icon: DashboardOutlined,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: ManageAccounts,
    label: "Manage Users",
    href: "/manage-users",
    component: ManageUsers,
  },
  {
    icon: CalendarViewDay,
    label: "Manage Events",
    href: "/manage-events",
    component: ManageEvents,
  },
];
