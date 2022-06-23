import { useDispatch } from "react-redux";
import { Link,useParams} from "react-router-dom"
import { toast } from "react-toastify";
import { removeVideoFromPlaylist } from "../../pages/playlist/playlistSlice"
import "./playlistModal.css"
export const PlaylistVideoCard =({playlistVideoCard:data})=>{
    const {playlistId} = useParams();
    const dispatch= useDispatch()
    const deleteVideo = ()=>{
        dispatch(removeVideoFromPlaylist({videoId:data._id,playlistId:playlistId}))
        toast.success("Video Removed From Playlist")
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