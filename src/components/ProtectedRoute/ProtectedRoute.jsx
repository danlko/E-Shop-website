import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (typeof window === "undefined") return <Navigate to="/login" replace />;

  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) return <Navigate to="/login" replace />;

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found =
      Array.isArray(users) && users.find((u) => u.email === userEmail);
    if (!found) {
      localStorage.removeItem("userEmail");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("userEmail");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
