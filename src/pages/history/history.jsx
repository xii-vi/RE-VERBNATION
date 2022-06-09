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
        <div className="flex py-3 center-flex">
        <p className="text-bold text-center h3 pl-4">
            History
        </p>
            <div className="margin-left-auto pr-4">
                <p className="btn btn-primary" onClick={removeAllVideo}>Clear History<i className="fa fa-trash pl-4"></i></p>
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
            <div className="position-relative" key={video._id}>
            <VideoCard singleVideoCard={video}/>
            <div className="delete-btn p-2"><i class="fa fa-trash" id={video._id} onClick={(e)=>removeVideo(e.target.id)}></i>
            </div>
            </div>
            ))}
            </div>
    </div>}
    </div>
    )
}