import { Box, Typography } from "@mui/material";

const WelcomeHeading = () => {
  return (
    <Box sx={{ marginBottom: "40px" }}>
      <Typography variant="h6" textAlign={"center"}>
        Welcome to
      </Typography>
      <Typography variant="h4" marginBottom={"40px"} textAlign={"center"}>
        Event Management App
      </Typography>
    </Box>
  );
};

export default WelcomeHeading;
