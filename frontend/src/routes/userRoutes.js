import { DashboardOutlined, EmojiEvents, Queue } from "@mui/icons-material";
import CreateEvent from "../pages/CreateEvent";
import AllEvents from "../pages/AllEvents";
import Dashboard from "../pages/Dashboard";

export const userRoutes = [
  {
    icon: DashboardOutlined,
    label: "Dashboard",
    href: "/",
    component: Dashboard,
  },
  {
    icon: Queue,
    label: "Create Event",
    href: "/create-event",
    component: CreateEvent,
  },
  {
    icon: EmojiEvents,
    label: "All Events",
    href: "/all-events",
    component: AllEvents,
  },
];
