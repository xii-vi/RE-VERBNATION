import { Link } from "react-router-dom"
import "./footer.css"
export const Footer = ()=>{
    return(
        <aside className="flex p-3 footer-menu">
            <p className="p-2"><Link to="/"><i className="fas fa-compass footer-icon"></i></Link></p>
            <p className="p-2"><Link to="/likedvideo"><i className="fas fa-thumbs-up footer-icon"></i></Link></p>
            <p className="p-2"><Link to="/playlist"><i className="fas fa-plus-square footer-icon"></i></Link></p>
            <p className="p-2"><Link to="/watchlater"> <i className="fas fa-clock footer-icon"></i></Link></p>
            <p className="p-2"><Link to="/history"><i className="fas fa-history footer-icon"></i></Link></p>    
        </aside>
    )
}