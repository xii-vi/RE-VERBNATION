import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useVideo } from "../../context/videoContext"
import { useAuth } from "../../context/authContext"
import { isVideoInWatchLater, isVideoInLikedVideo,isVideoInHistory } from "../../utilities/helper/videoFunctions"
import { removeVideoFromWatchLater,addVideoInWatchLater, addVideoInLikedVideo,removeVideoFromLikedVideo,addVideoInHistory } from "../../utilities/apis/apis"
import "./singleVideo.css"
export const SingleVideo =()=>{
    const navigate = useNavigate();
    const {videoData,VideoState:{watchLaterList,LikedVideos,History}, VideoDispatch} = useVideo()
    const {videoId} = useParams()
    const { authState: { userLogin, encodedToken }} = useAuth();
    const videoDetails = videoData?.find(({ _id }) => _id === videoId)
    
    useEffect(() => {
        (async () => {
            if(!isVideoInHistory(videoDetails._id,History))
            addVideoInHistory(videoDetails, VideoDispatch, encodedToken)
        })()},[videoDetails,VideoDispatch])

    const watchLaterHandler =()=>{
            if (userLogin) {
                if (isVideoInWatchLater(videoDetails._id, watchLaterList)) {
                removeVideoFromWatchLater(videoDetails._id, VideoDispatch, encodedToken);
                } else {
                addVideoInWatchLater(videoDetails, VideoDispatch, encodedToken);
                }
            } else {
                navigate("/login");
            }
        
        };
    
    const LikedVideoHandler =()=>{
            if (userLogin) {
                if (isVideoInLikedVideo(videoDetails._id, LikedVideos)) {
                    removeVideoFromLikedVideo(videoDetails._id, VideoDispatch, encodedToken);
                    } else {
                    addVideoInLikedVideo(videoDetails, VideoDispatch, encodedToken);
                    }
                } else {
                    navigate("/login");
                }
        };     
    return(
    <div className="video-player py-5"> 
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
            <h4>{videoDetails?.title}</h4>
            <small className="text-bold">{videoDetails?.views} views</small>
            <small className="px-2 text-bold">{videoDetails?.uploaded} months ago</small>
            </div>
            
            <div className="margin-left-auto">
                <i className="fa fa-thumbs-up px-2" onClick={LikedVideoHandler}></i>
                <i className="fa fa-clock px-2" onClick={watchLaterHandler}></i>
                <i className="fa fa-plus-square px-2"></i>
            </div>
        </div>
        <div className="flex">
            <img className="img-round avatar-lg" src={videoDetails?.logo} alt="creator-logo"/>
            <div className="flex center-flex flex-direction-col px-2">
            <h6>{videoDetails?.creator}</h6>
            </div>
            </div>
        
        <p>{videoDetails?.description}</p>
    </div>
    )
}