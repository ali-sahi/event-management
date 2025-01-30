import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { adminRoutes } from "../routes/adminRoutes";
import { userRoutes } from "../routes/userRoutes";

const Sidebar = () => {
  const role = "user";

  const renderAdminMenuItems = () => {
    return adminRoutes.map((menuItem) => (
      <ListItem key={menuItem.href} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <menuItem.icon />
          </ListItemIcon>
          <ListItemText primary={menuItem.label} />
        </ListItemButton>
      </ListItem>
    ));
  };

  const renderUserMenuItems = () => {
    return userRoutes.map((menuItem) => (
      <ListItem key={menuItem.href} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            {" "}
            <menuItem.icon />
          </ListItemIcon>
          <ListItemText primary={menuItem.label} />
        </ListItemButton>
      </ListItem>
    ));
  };
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {role === "admin" && renderAdminMenuItems()}
        {role === "user" && renderUserMenuItems()}
      </List>

      <List></List>
    </Drawer>
  );
};

export default Sidebar;
