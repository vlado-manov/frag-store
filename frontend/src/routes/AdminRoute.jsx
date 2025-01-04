import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo?.isAdmin ? (
    <Outlet />
  ) : userInfo ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
