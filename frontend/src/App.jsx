import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./routes/PrivateRoutes";
import { useTheme } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageEvents from "./pages/ManageEvents";
import CreateEvent from "./pages/CreateEvent";
import AllEvents from "./pages/AllEvents";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Singup";

const App = () => {
  const theme = useTheme();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes allowedRoles={["admin", "user"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Route>

          <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-events" element={<ManageEvents />} />
          </Route>

          <Route element={<PrivateRoutes allowedRoles={["user"]} />}>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/all-events" element={<AllEvents />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          style: {
            background: "#1E1E1E",
            color: theme.palette.text.primary,
            borderRadius: "8px",
            padding: "10px 20px",
          },
          success: {
            style: {
              background: "#1E1E1E",
              color: theme.palette.text.primary,
            },
          },
          error: {
            style: {
              background: "#1E1E1E",
              color: theme.palette.text.primary,
            },
          },
        }}
      />
    </>
  );
};

export default App;
