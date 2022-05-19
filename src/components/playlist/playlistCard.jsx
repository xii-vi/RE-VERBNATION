import { Link } from "react-router-dom"
import { removePlaylist } from "../../utilities/apis/apis"
import { useAuth } from "../../context/authContext"
import { useVideo } from "../../context/videoContext"
import "./playlistModal.css"
import empty from "../../assest/empty.png"
export const PlaylistCard =({playlistDetails})=>{
    const { videos, title, _id } = playlistDetails
    const { authState: { encodedToken }} = useAuth();
    const { VideoDispatch } = useVideo();
    const deletePlaylist = ()=>{
        removePlaylist(_id,VideoDispatch,encodedToken)
    }
    return(
            <div className="videoCard p-1 playlist-card">
            {videos.length === 0 ? <img className="img-responsive py-2" src={empty} alt="empty-img"/>:
            <Link to={`/playlist/${_id}`} ><img className="img-responsive" src={videos.map(item=>item.creatorImage)} alt="creator-img"/></Link>}
            <div className="playlist-title text-bold p-2">
                <h6>{title}</h6>
            </div>
            <div className="playlist-delete flex flex-direction-col">
                <h5>{videos.length}</h5>
                <i className="fas fa-trash" onClick={deletePlaylist}></i>
            </div>
            </div>
    )
}