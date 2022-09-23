import { Navigate, useLocation } from "react-router-dom";
import routes from "../constants/routes";
import useAuth from "../hooks/useAuth"
import Admin from "./Admin";
import User from "./User";

function PrivateRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.first_name && user?.last_name && user?.email)
    return user.is_admin ? <Admin /> : <User />
  else
    return <Navigate to={routes.LOGIN} state={{ from: location }} replace />
}

export default PrivateRoute