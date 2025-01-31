import { CalendarViewDay, DashboardOutlined, ManageAccounts } from "@mui/icons-material";

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
  },
  {
    icon: CalendarViewDay,
    label: "Manage Events",
    href: "/manage-events",
  },
];
