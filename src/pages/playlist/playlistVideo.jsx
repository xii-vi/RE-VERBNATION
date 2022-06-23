import { PlaylistVideoCard } from "../../components/playlist/playlistVideoCard";
import empty from "../../assest/empty.png"
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export const PlaylistVideo =()=>{
    const {Playlist} = useSelector(store=>store.playlist)
    const {playlistId} = useParams();
    const data = Playlist.find((item) => item._id === playlistId)
    const videos = data?.videos;
    return(
    <div className="main">
    <h3 className="text-center py-4">{data.title}</h3>
    {videos.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
    </div> :
        <div className="flex">
        <div className="flex videos main-display">
            {videos.map((video) => (
            <PlaylistVideoCard playlistVideoCard={video} key={video._id}/>
            ))}
            </div>
    </div>}
    </div>
    )
}