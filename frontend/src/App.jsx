import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

import { useAuth } from "./providers/AuthProvider";
import { adminRoutes } from "./routes/adminRoutes";
import { userRoutes } from "./routes/userRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const { user } = useAuth();
  const isLoggedIn = user ? true : false;

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} /> */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Singup />} />

          <Route path="/" element={<PrivateRoutes allowedRoles={["admin"]} />}>
            {adminRoutes.map((item) => (
              <Route
                key={item.href}
                path={item.href}
                element={isLoggedIn ? <item.component /> : <Navigate to="/login" />}
              />
            ))}
          </Route>

          <Route path="/" element={<PrivateRoutes allowedRoles={["user", "admin"]} />}>
            {userRoutes.map((item) => (
              <Route
                key={item.href}
                path={item.href}
                element={isLoggedIn ? <item.component /> : <Navigate to="/login" />}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  );
};

export default App;
