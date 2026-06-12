import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
  } = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" />
    );
  }

  return children;
};

export default ProtectedRoute;