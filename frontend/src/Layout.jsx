/* eslint-disable react/prop-types */

import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
