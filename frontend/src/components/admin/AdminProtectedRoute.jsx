import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute({ isAdmin }) {
  if (!isAdmin) {
    // Not admin, redirect to admin login page
    return <Navigate to="/" replace />;
  }
  // User is admin, render child routes
  return <Outlet />;
}
