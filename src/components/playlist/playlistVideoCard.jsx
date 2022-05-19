import { Link,useParams} from "react-router-dom"
import { removeVideoFromPlaylist } from "../../utilities/apis/apis"
import { useAuth } from "../../context/authContext"
import { useVideo } from "../../context/videoContext"
import "./playlistModal.css"
export const PlaylistVideoCard =({playlistVideoCard:data})=>{
    const { authState: { encodedToken }} = useAuth();
    const { VideoDispatch } = useVideo();
    const {playlistId} = useParams()
    const deleteVideo = ()=>{
        removeVideoFromPlaylist(data._id,VideoDispatch,encodedToken,playlistId)
    }
    return(
        <div className="videoCard">
            <div className="playlist-card">
            <Link to={`/video/${data._id}`}>
                <img className="img-responsive" src={data.creatorImage} alt="creator-img"/>
            </Link>
            <div className="playlist-delete flex flex-direction-col">
                <i className="fas fa-trash" onClick={deleteVideo}></i>
            </div>
            </div>
            
            <div className="p-4">
            <div className="videoCardTitle">
                <p className="h5 py-2">{data.title}</p>
                <p>{data.creator}</p>
            </div>
            <div className="flex">
            <p><small>{data.duration}</small></p>
            <p className="margin-left-auto">{data.uploaded} months ago</p>
            </div>
            
            </div>
        </div>
    )
}