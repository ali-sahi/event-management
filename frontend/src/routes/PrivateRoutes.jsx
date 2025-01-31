/* eslint-disable react/prop-types */

import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import Layout from "../Layout";

const PrivateRoutes = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthRoute) {
    return <Outlet />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoutes;
