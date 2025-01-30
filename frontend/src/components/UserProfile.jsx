import { Badge, Email } from "@mui/icons-material";
import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";

const UserProfile = ({ email, role }) => {
  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h4">Profile</Typography>
        <Divider />
      </Stack>

      <List sx={{ marginTop: "30px" }}>
        <ListItem disablePadding>
          <ListItemIcon>
            <Badge />
          </ListItemIcon>
          <ListItemText primary={"Role"} secondary={role} />
        </ListItem>

        <ListItem disablePadding>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary={"Email"} secondary={email} />
        </ListItem>
      </List>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained">Logout</Button>
      </Box>
    </>
  );
};

export default UserProfile;
