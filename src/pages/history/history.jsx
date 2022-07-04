import { VideoCard } from "../../components/card/videocard";
import empty from "../../assest/empty.png"
import { Link } from "react-router-dom";
import { removeAllVideoFromHistory, removeVideoFromHistory } from "../homepage/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export const History =()=>{
    const {History} = useSelector(store=>store.video);
    const dispatch = useDispatch();
    const removeVideo =(id)=>{
        dispatch(removeVideoFromHistory(id))
        toast.success("Removed from History")
    }
    const removeAllVideo =()=>{
        dispatch(removeAllVideoFromHistory())
        toast.success("History Cleared")
    }
    return(
    <div className="main">
    {History.length === 0 ? 
    <div className="py-4 flex center-flex flex-direction-col">
        <div className="flex">
        <h3>Nothing in History</h3>
        <div className="margin-left-auto px-5">
        <Link to="/"><button className="btn btn-primary">Explore</button></Link>
        </div>
        </div>
        <img className="img-responsive py-2" src={empty} alt="empty-img"/>
    </div> :
    <div>
        <div className="flex py-3 center-flex">
        <p className="text-bold text-center h3 pl-4">
            History
        </p>
            <div className="margin-left-auto pr-4">
                <p className="btn btn-primary" onClick={removeAllVideo}>Clear History<i className="fa fa-trash pl-4"></i></p>
            </div>
        </div>
        <div className="flex p-4">
        <div className="videos main-display">
            {History.map((video) => (
            <div className="position-relative" key={video.id}>
            <VideoCard singleVideoCard={video}/>
            <div className="delete-btn p-2"><i className="fa fa-trash" onClick={()=>removeVideo(video._id)}></i>
            </div>
            </div>
            ))}
            </div>
    </div>
    </div>}
    </div>
    )
}