import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { user } = useContext(UserContext);

  // Check if user exists and has an email
  return user && user.email ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoutes;
