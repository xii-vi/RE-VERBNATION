import "./sidebar.css"
export const Sidebar = () => {
    return(
        <aside className="flex flex-direction-col p-3 mt-4 sidebar">
            <ul>
            <li className="p-2"><i className="fas fa-home"></i><button className="btn sidebar-btn"> Home</button ></li>
            <li className="p-2"><i class="fas fa-compass"></i><button className="btn sidebar-btn"> Explore</button ></li>
            <li className="p-2"><i class="fas fa-thumbs-up"></i><button className="btn sidebar-btn"> Liked Video</button ></li>
            <li className="p-2"><i className="fas fa-plus-square"></i><button className="btn sidebar-btn"> Playlist</button ></li>
            <li className="p-2"><i class="fas fa-clock"></i><button className="btn sidebar-btn">Watch later</button ></li>
            <li className="p-2"><i class="fas fa-user"></i><button className="btn sidebar-btn"> User</button ></li>    
            </ul>
        </aside>
    )
}