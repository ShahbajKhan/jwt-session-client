import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  const location = useLocation();

  if (userLoading) {
    return <h1 className="font-bold text-center">Loading...</h1>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/authentication" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
