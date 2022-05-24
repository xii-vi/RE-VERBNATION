import { useVideo } from "../../context/videoContext"
import { VideoCard } from "../../components/card/videocard";
import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
import { removeAllVideoFromHistory, removeVideoFromHistory } from "../../utilities/apis/apis";
import { useAuth } from "../../context/authContext";
export const History =()=>{
    const {authState:{encodedToken}} = useAuth()
    const {VideoState:{History},VideoDispatch} = useVideo();
    return(
    <div className="main">
        <div className="flex py-3 center-flex">
        <p className="text-bold text-center h3 pl-4">
            History
        </p>
            <div className="margin-left-auto pr-4">
                <p className="btn btn-primary" onClick={()=>removeAllVideoFromHistory(VideoDispatch,encodedToken)}>Clear History<i className="fa fa-trash pl-4"></i></p>
            </div>
        </div>
    {History.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
    </div> :
        <div className="flex p-4">
        <div className="videos main-display">
            {History.map((video) => (
            <div className="position-relative">
            <VideoCard singleVideoCard={video} key={video._id}/>
            <div className="delete-btn p-2"><i class="fa fa-trash" id={video._id} onClick={(e)=>removeVideoFromHistory(e.target.id,VideoDispatch,encodedToken)}></i>
            </div>
            </div>
            ))}
            </div>
    </div>}
    </div>
    )
}