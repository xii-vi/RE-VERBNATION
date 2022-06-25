import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
import { PlaylistCard } from "../../components/playlist/playlistCard";
import { useSelector } from "react-redux";
export const Playlist =()=>{
    const {Playlist} = useSelector(store=>store.playlist)
    return(
    <div className="main">
    {Playlist.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <div className="flex">
        <h3>No Playlist</h3>
        <div className="margin-left-auto px-5">
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
        </div>
        </div>
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
    </div> :
    <>
    <p className="text-bold text-center h3 py-3">
            Playlist
        </p>
        <div className="flex p-4">
        <div className="flex videos main-display">
            {Playlist.map((playlist) => (
            <PlaylistCard playlistDetails={playlist} key={playlist._id}/>
            ))}
            </div>
    </div>
    </>}
    </div>
    )
}