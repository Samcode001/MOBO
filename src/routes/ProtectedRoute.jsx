import React from "react";
import { Navigate } from "react-router-dom";
import useHandleUser from "../hooks/handleUser";

const ProtectedRoute = ({ children }) => {
  const { user, getUser } = useHandleUser();

  const isAuthenticated = true;
  if (user) return children;
  else return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
