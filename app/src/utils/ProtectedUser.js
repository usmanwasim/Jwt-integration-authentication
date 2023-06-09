import React, { useContext } from "react";
import { DataContext } from "./ContextApi";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedUser() {
  const { authToken, isAdmin } = useContext(DataContext);
  console.log(authToken.isAuthenticated, !isAdmin, "user");
  if (authToken.isAuthenticated && !isAdmin) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}
