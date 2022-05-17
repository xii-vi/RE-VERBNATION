import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const RequireAuth = () => {
const { authState:{userLogin} } = useAuth();
const location = useLocation();
console.log(userLogin)
return (
(userLogin?<Outlet />:<Navigate to="/login" state={{ from: location }} replace />)
    )
};
