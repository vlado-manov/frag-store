import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo?.isAdmin ? (
    <Outlet />
  ) : userInfo ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
