import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const RequireAuth = () => {
const { authState:{userLogin} } = useAuth();
const location = useLocation();
return (
(userLogin?<Outlet />:<Navigate to="/login" state={{ from: location }} replace />)
    )
};
