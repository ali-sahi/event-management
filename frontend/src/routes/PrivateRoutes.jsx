/* eslint-disable react/prop-types */

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import Layout from "../Layout";

const PrivateRoutes = ({ allowedRoles }) => {
  const { user } = useAuth();

  //   if (!user || !allowedRoles.includes(user.role)) {
  //     return <Navigate to="/login" />;
  //   }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoutes;
