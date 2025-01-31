/* eslint-disable react/prop-types */

import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { useAxios } from "./providers/AxiosInterceptorProvider";
import SessionModal from "./components/SessionModal";

const Layout = ({ children }) => {
  const { sessionExpired } = useAxios();
  return (
    <>
      {sessionExpired && <SessionModal />}
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 10, minHeight: "100vh" }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
