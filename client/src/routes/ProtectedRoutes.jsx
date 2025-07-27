import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";

const ProtectedRoutes = () => {
  const { email, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  if (!email) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
