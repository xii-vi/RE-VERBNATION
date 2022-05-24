import { useVideo } from "../../context/videoContext";
import { VideoCard } from "../../components/card/videocard";
import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
import { removeVideoFromWatchLater } from "../../utilities/apis/apis";
import { useAuth } from "../../context/authContext";
export const WatchLater = () => {
const {VideoState: { watchLaterList },VideoDispatch} = useVideo();
const {authState:{encodedToken}} = useAuth();
return (
    <div className="main">
        <p className="text-bold text-center h3 py-3">
            WatchLater List
        </p>
    {watchLaterList.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
    </div> :
        <div className="flex p-4">
        <div className="flex videos main-display">
            {watchLaterList.map((video) => (
            <div className="position-relative">
            <VideoCard singleVideoCard={video} key={video._id}/>
            <div className="delete-btn p-2">
            <i class="fa fa-trash" id={video._id} onClick={(e)=>removeVideoFromWatchLater(e.target.id,VideoDispatch, encodedToken)}></i>
            </div>
            </div>
            ))}
            </div>
    </div>}
    </div>
);
};