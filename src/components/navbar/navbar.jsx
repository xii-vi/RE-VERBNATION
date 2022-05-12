import "./navbar.css"
import { useTheme } from "../../context/themeContext"

export const Navbar =()=>{
    const { toggleTheme, theme } = useTheme();
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
            <button className="btn btn-primary">Login</button>
                <i className="far fa-user fa-2x"></i>
                <i className="fa fa-sun fa-2x px-2" onClick={toggleTheme}></i>
            </div>
        </nav>
    </div>
    )
}