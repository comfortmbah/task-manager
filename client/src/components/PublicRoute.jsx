import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>
  }

  if (token) {
    return <Navigate to={'/home'} replace />
  }

  return children;
}

export default PublicRoute;