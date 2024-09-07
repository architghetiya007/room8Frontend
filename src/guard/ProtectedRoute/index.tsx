import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthStorage } from "../../utils/Comman/auth";

const ProtectedRoute: React.FC = () => {
  let isAuthenticated: boolean = localStorage.getItem(AuthStorage.TOKEN)
    ? true
    : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
