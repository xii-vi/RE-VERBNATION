import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
import { isVideoInWatchLater, isVideoInLikedVideo,isVideoInHistory } from "../../utilities/helper/videoFunctions"
import "./singleVideo.css"
import { PlaylistModal } from "../../components/playlist/playlistModal"
import { addVideoInLikedVideo,removeVideoFromLikedVideo,addVideoInWatchLater,removeVideoFromWatchLater,addVideoInHistory } from "../homepage/videoSlice"
import { setIsModalOpen } from "../playlist/playlistSlice"
import { VideoCard } from "../../components/card/videocard"
export const SingleVideo =()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isModalOpen} = useSelector(store=>store.playlist)
    const {videoId} = useParams();
    const {encodedToken} = useSelector(store=>store.auth)
    const {videos,LikedVideos,WatchLater,History} = useSelector(store=>store.video)
    const videoDetails = videos?.find(({ _id }) => _id === videoId)
    const suggestedVideos = videos?.filter(({ _id,category })=>_id !== videoId && category===videoDetails.category )
    useEffect(() => {
            if(videoDetails && !isVideoInHistory(videoId,History))
            dispatch(addVideoInHistory(videoDetails))
    },[videoDetails,History,videoId])

    const watchLaterHandler =()=>{
            if (encodedToken) {
                if (isVideoInWatchLater(videoDetails._id, WatchLater)) {
                dispatch(removeVideoFromWatchLater(videoDetails._id)).then((res) => toast.success("Removed From WatchLater!"))
                .catch((error) => toast.error(error));
                } else {
                dispatch(addVideoInWatchLater(videoDetails)).then((res) => toast.success("Added to WatchLater!"))
                .catch((error) => toast.error(error));
                }
            } else {
                navigate("/login");
            }
        
        };
    
    const LikedVideoHandler =()=>{
            if (encodedToken) {
                if (isVideoInLikedVideo(videoDetails._id, LikedVideos)) {
                    dispatch(removeVideoFromLikedVideo(videoDetails._id)).then((res) => toast.success("Video Disliked!"))
                    .catch((error) => toast.error(error));
                    } else {
                    dispatch(addVideoInLikedVideo(videoDetails)).then((res) => toast.success("Video Liked!"))
                    .catch((error) => toast.error(error));
                    }
                } else {
                    navigate("/login");
                }
        };
        
    const playlistModal =()=>{
            if(encodedToken){
                isModalOpen?dispatch(setIsModalOpen(false)):dispatch(setIsModalOpen(true))
            }
        else
        navigate("/login");
        }   
        
    return(
    <div className="single-video-page-layout">
        <div className="video-player p-5"> 
        <div className="video-player-details">
        <div className="center-flex">
            <iframe
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        </div>
        <div className="flex py-2">
            <div className="flex-direction-col">
            <h4 className="video-title">{videoDetails?.title}</h4>
            <small className="text-bold">{videoDetails?.views} views</small>
            <small className="px-2 text-bold">{videoDetails?.uploaded} months ago</small>
            </div>
            <div className="margin-left-auto feat-handler">
                {isVideoInLikedVideo(videoId, LikedVideos)?<span className="px-4" onClick={LikedVideoHandler}><i className="fa fa-thumbs-up px-2" ></i>Like</span>:<span className="px-4" onClick={LikedVideoHandler}><i className="far fa-thumbs-up px-2"></i>Like</span>}
                {isVideoInWatchLater(videoId, WatchLater)?<span className="px-4" onClick={watchLaterHandler}><i className="fa fa-clock px-2"></i>Watchlater</span>:<span className="px-4" onClick={watchLaterHandler}><i className="far fa-clock px-2"></i>Watchlater</span>}
                <span className="pl-4" onClick={playlistModal}><i className="fa fa-plus-square px-2"></i>Add to Playlist</span>
            </div>
        </div>
        <div className="flex">
            <img className="img-round avatar-lg" src={videoDetails?.logo} alt="creator-logo"/>
            <div className="flex center-flex flex-direction-col px-2">
            <h6>{videoDetails?.creator}</h6>
            </div>
        </div>
            <small className="h6">{videoDetails?.description}</small>

        {isModalOpen && <PlaylistModal playlistVideo={videoDetails}/>}
        </div>
        </div>
        <div className="suggested-video py-4 pr-5">
        {suggestedVideos.map(item=><VideoCard singleVideoCard={item} key={item._id}/>)}
        </div>
    </div>
    )
}