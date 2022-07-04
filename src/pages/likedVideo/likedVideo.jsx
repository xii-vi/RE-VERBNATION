import { VideoCard } from "../../components/card/videocard";
import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
import { removeVideoFromLikedVideo } from "../homepage/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export const LikedVideo =()=>{
    const {LikedVideos} = useSelector(store=>store.video);
    const dispatch = useDispatch();

    const removeVideo = (id)=>{
        dispatch(removeVideoFromLikedVideo(id))
        toast.success("Removed from Liked Videos")
    }
    return(
    <div className="main">
    {LikedVideos.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <div className="flex">
        <h3>No Liked Videos</h3>
        <div className="margin-left-auto px-5">
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
        </div>
        </div>
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
    </div> :
    <>
    <p className="text-bold text-center h3 py-3">
            Liked Videos
        </p>
        <div className="flex p-4">
        <div className="flex videos main-display">
            {LikedVideos.map((video) => (
            <div className="position-relative" key={video._id}>
            <VideoCard singleVideoCard={video} />
            <div className="delete-btn p-2">
            <i className="fa fa-trash" id={video._id} onClick={(e)=>removeVideo(e.target.id)}></i>
            </div>
            </div>
            ))}
            </div>
    </div>
    </>}
    </div>
    )
}