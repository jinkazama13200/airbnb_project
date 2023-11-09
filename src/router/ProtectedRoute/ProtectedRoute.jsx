import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <Navigate to={"/"} replace />;
  }

  if (currentUser?.user?.role !== "USER") {
    localStorage.removeItem("currentUser");
    window.location.replace("/");
  }

  return children || <Outlet />;
}
