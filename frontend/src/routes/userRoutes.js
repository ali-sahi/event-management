import { DashboardOutlined, EmojiEvents, Queue } from "@mui/icons-material";

export const userRoutes = [
  {
    icon: DashboardOutlined,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Queue,
    label: "Create Event",
    href: "/create-event",
  },
  {
    icon: EmojiEvents,
    label: "All Events",
    href: "/all-events",
  },
];
