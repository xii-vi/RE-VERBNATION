import "./videoCard.css"
import "../../style/layout.css"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
import { isVideoInWatchLater } from "../../utilities/helper/videoFunctions"
import { removeVideoFromWatchLater,addVideoInWatchLater} from "../../pages/homepage/videoSlice"
import { setIsModalOpen } from "../../pages/playlist/playlistSlice"
export const ExploreVideoCard =({singleVideoCard : data,setCurrentClickedVideo})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isModalOpen} = useSelector(store=>store.playlist)
    const {encodedToken} = useSelector(store=>store.auth)
    const {WatchLater} = useSelector(store=>store.video)
    const [modal,setModal] = useState(false)

    const showModal =()=>{
        modal?setModal(false):setModal(true)
    }

    const watchLaterHandler =()=>{
        if (encodedToken) {
            if (isVideoInWatchLater(data._id, WatchLater)) {
            dispatch(removeVideoFromWatchLater(data._id)).then((res) => toast.success("Removed From WatchLater!"))
            .catch((error) => toast.error(error));
            } else {
            dispatch(addVideoInWatchLater(data)).then((res) => toast.success("Added to WatchLater!"))
            .catch((error) => toast.error(error));
            }
        } else {
            navigate("/login");
        }
    
    };

    const playlistModal =()=>{
        if(encodedToken){
            setCurrentClickedVideo(data)
            isModalOpen?dispatch(setIsModalOpen(false)):dispatch(setIsModalOpen(true))
        }
    else
    navigate("/login");
    } 

    return(
        <div className="videoCard p-1">
            <Link to={`/video/${data._id}`}>
                <img className="img-responsive" src={data.creatorImage} alt="creator-img"/>
            </Link>
            <div className="py-2 p-2">
            <div className="videoCardTitle">
                <div className="flex">
                <div className="py-2">{data.title}</div>
                <div className="dropdown margin-left-auto">
                <i className="fas fa-ellipsis-v" onClick={showModal}></i>
                <ul className={modal?"dropdown-menu active p-3":"hidden"}>
                    <li className="pb-2">
                    {isVideoInWatchLater(data._id, WatchLater)?<span onClick={watchLaterHandler}><i className="fa fa-clock px-2"></i>Watchlater</span>:<span onClick={watchLaterHandler}><i className="far fa-clock px-2" ></i>Watchlater</span>}
                    </li>
                    <li>
                    <span onClick={playlistModal}><i className="fa fa-plus-square px-2"></i>Add to Playlist</span>
                    </li>
                </ul>
                </div>
                </div>
                <small>{data.creator}</small>
            </div>
            <div className="flex py-1">
            <small>{data.duration}</small>
            <small className="margin-left-auto">{data.uploaded} months</small>
            </div>
            </div>
        </div>
    )
}