import "./navbar.css"
import { useTheme } from "../../context/themeContext"
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const Navbar =()=>{
    const { toggleTheme } = useTheme();
    const {authState:{userLogin,userData},authDispatch}=useAuth();
    const logoutHandler = () => {
        localStorage.clear();
        authDispatch({ type: "USER_LOGOUT" })
    }
    console.log(userData)
    return(
    <div className="navbar-wrapper">
        <nav className="flex navbar">
            <div className="logo">
            <span className="category-heading h2 site-name">RE-Verse</span>     
            </div>
            <div className="search-bar-wrapper flex p-2">
            <input type="text" placeholder="Search for Videos" />
            <button><i className="fa fa-search cursor-pointer"></i></button>
            </div>
            <div className="nav-left-side-pills">
            {userLogin?<span className="btn btn-secondary" onClick={logoutHandler}>Logout</span>:
            <Link to="/login"><span className="btn btn-secondary">Login</span></Link>}
            <i className="fa fa-sun fa-2x px-2" onClick={toggleTheme}></i>
            </div>
        </nav>
    </div>
    )
}