import { useVideo } from "../../context/videoContext"
import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
import { PlaylistCard } from "../../components/playlist/playlistCard";
export const Playlist =()=>{
    const {VideoState:{Playlist}} = useVideo();
    return(
    <div className="main">
        <p className="text-bold text-center h3 py-3">
            Playlist
        </p>
    {Playlist.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
    </div> :
        <div className="flex p-4">
        <div className="flex videos main-display">
            {Playlist.map((playlist) => (
            <PlaylistCard playlistDetails={playlist} key={playlist._id}/>
            ))}
            </div>
    </div>}
    </div>
    )
}