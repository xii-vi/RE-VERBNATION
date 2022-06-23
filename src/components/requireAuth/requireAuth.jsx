import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
const {encodedToken} = useSelector(store=>store.auth)
const location = useLocation();
return (
(encodedToken?<Outlet />:<Navigate to="/login" state={{ from: location }} replace />)
    )
};
