import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Here we check if token exists in localStorage as fallback
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in then redirect user to login
    return <Navigate to="/login" replace />;
  }

  return children; // Token exists then render child page
}

export default ProtectedRoute;
