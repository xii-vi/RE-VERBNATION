import "./navbar.css"
import { useTheme } from "../../context/themeContext"
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useVideo } from "../../context/videoContext";

export const Navbar =()=>{
    const {theme, toggleTheme } = useTheme();
    const {authState:{userLogin},authDispatch}=useAuth();
    const {VideoDispatch} = useVideo()
    const logoutHandler = () => {
        localStorage.clear();
        authDispatch({ type: "USER_LOGOUT" })
    }
    return(
    <div className="navbar-wrapper">
        <nav className="flex navbar">
            <div className="logo"> 
            <Link to="/"><span className="category-heading h4 site-name">RE-Verb<span className="site-subname">nation</span></span></Link>    
            </div>
            <div className="search-bar-wrapper flex p-2">
            <input type="text" placeholder="Search for Videos" onChange={(e) => VideoDispatch({ type: "FILTER_BY_SEARCH", payload: e.target.value })}/>
            <button><i className="fa fa-search cursor-pointer"></i></button>
            </div>
            <div className="nav-left-side-pills">
            {theme==="dark"?<i className="fa fa-sun fa-2x px-5" onClick={toggleTheme}></i>:<i class="fas fa-moon fa-2x px-2" onClick={toggleTheme}></i>}
            {userLogin?<span className="btn btn-secondary auth-btn" onClick={logoutHandler}>Logout</span>:
            <Link to="/login"><span className="btn btn-secondary auth-btn">Login</span></Link>}
            </div>
        </nav>
    </div>
    )
}