import "./navbar.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../pages/theme/themeSlice";
import { logoutUser } from "../../pages/auth/authSlice";
import { toast } from "react-toastify";
export const Navbar =()=>{
    const { theme } = useSelector((store) => store.theme);
    const { encodedToken } = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutUser())
        toast.info("Logged out!");
    }
    return(
    <div className="navbar-wrapper">
        <nav className="flex navbar">
            <div className="logo"> 
            <Link to="/"><span className="category-heading h4 site-name">RE-Verb<span className="site-subname">nation</span></span></Link>    
            </div>
            <div className="nav-left-side-pills">
            {theme ==="dark"?<i className="fa fa-sun fa-2x px-5" onClick={()=>dispatch(toggleTheme("light"))}></i>:<i className="fas fa-moon fa-2x px-5" onClick={()=>dispatch(toggleTheme("light"))}></i>}
            {encodedToken?<span className="btn btn-secondary auth-btn" onClick={logoutHandler}>Logout<i className="fas fa-sign-out-alt ml-2"></i></span>:
            <Link to="/login"><span className="btn btn-secondary auth-btn">Log-in <i className="fas fa-sign-in-alt ml-2"></i></span></Link>}
            </div>
        </nav>
    </div>
    )
}