import { useVideo } from "../../context/videoContext"
import { VideoCard } from "../../components/card/videocard";
import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
export const LikedVideo =()=>{
    const {VideoState:{LikedVideos}} = useVideo();
    return(
    <div className="main">
    {LikedVideos.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
    </div> :
        <div className="flex">
        <div className="flex videos main-display">
            {LikedVideos.map((video) => (
            <VideoCard singleVideoCard={video} key={video._id}/>
            ))}
            </div>
    </div>}
    </div>
    )
}