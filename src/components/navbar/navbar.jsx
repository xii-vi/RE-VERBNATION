import "./navbar.css"
import { useTheme } from "../../context/themeContext"
import { Link } from "react-router-dom";

export const Navbar =()=>{
    const { toggleTheme } = useTheme();
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
            <Link to="/login"><button className="btn btn-secondary">Login</button></Link>
            <i className="fa fa-sun fa-2x px-2" onClick={toggleTheme}></i>
            </div>
        </nav>
    </div>
    )
}