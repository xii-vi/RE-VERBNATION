import { VideoCard } from "../../components/card/videocard";
import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
import { removeVideoFromWatchLater } from "../homepage/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export const WatchLater = () => {
const dispatch = useDispatch();
const {WatchLater} = useSelector(store=>store.video);
const removeVideo =(id)=>{
    dispatch(removeVideoFromWatchLater(id))
    toast.success("Removed From WatchLater")
}
return (
    <div className="main">
    {WatchLater.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
    </div> :
    <>
    <p className="text-bold text-center h3 py-3">
            WatchLater
        </p>
        <div className="flex p-4">
        <div className="flex videos main-display">
            {WatchLater.map((video) => (
            <div className="position-relative">
            <VideoCard singleVideoCard={video} key={video._id}/>
            <div className="delete-btn p-2">
            <i class="fa fa-trash" id={video._id} onClick={(e)=>removeVideo(e.target.id)}></i>
            </div>
            </div>
            ))}
            </div>
    </div>
    </>}
    </div>
);
};