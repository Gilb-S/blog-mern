import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const GuessRoutes = () => {
  const { user } = useContext(UserContext);

  // Redirect to dashboard if already logged in
  return user && user.email ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuessRoutes;
