import { Link } from "react-router-dom"
import "./sidebar.css"
export const Sidebar = () => {
    return(
        <div className="sidebar-wrapper">
        <aside className="flex flex-direction-col p-3 sidebar">
            <ul>
            <li className="p-2"><Link to="/"><i class="fas fa-compass"></i><button className="btn sidebar-btn"> Explore</button ></Link></li>
            <li className="p-2"><Link to="/likedvideo"><i class="fas fa-thumbs-up"></i><button className="btn sidebar-btn"> Liked Video</button ></Link></li>
            <li className="p-2"><Link to="/playlist"><i className="fas fa-plus-square"></i><button className="btn sidebar-btn"> Playlist</button ></Link></li>
            <li className="p-2"><Link to="/watchlater"> <i class="fas fa-clock"></i><button className="btn sidebar-btn">Watch later</button ></Link></li>
            <li className="p-2"><Link to="/history"><i class="fas fa-history"></i><button className="btn sidebar-btn"> History</button ></Link></li>    
            </ul>
        </aside>
    </div>
    )
}