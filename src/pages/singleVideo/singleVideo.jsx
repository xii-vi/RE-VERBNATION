import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useVideo } from "../../context/videoContext"
import { useAuth } from "../../context/authContext"
import { isVideoInWatchLater, isVideoInLikedVideo,isVideoInHistory } from "../../utilities/helper/videoFunctions"
import { removeVideoFromWatchLater,addVideoInWatchLater, addVideoInLikedVideo,removeVideoFromLikedVideo,addVideoInHistory } from "../../utilities/apis/apis"
import "./singleVideo.css"
import { PlaylistModal } from "../../components/playlist/playlistModal"
export const SingleVideo =()=>{
    const navigate = useNavigate();
    const {videoData,VideoState:{watchLaterList,LikedVideos,History}, VideoDispatch,Modal,setModal} = useVideo()
    const {videoId} = useParams()
    const { authState: { userLogin, encodedToken }} = useAuth();
    const videoDetails = videoData?.find(({ _id }) => _id === videoId)

    useEffect(() => {
        (async () => {
            if(!isVideoInHistory(videoId,History))
            addVideoInHistory(videoDetails, VideoDispatch, encodedToken)
        })()},[videoDetails,VideoDispatch,History,encodedToken,videoId])

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
    const playlistModal =()=>{
            if(userLogin){
                Modal?setModal(false):setModal(true)
            }
        else
        navigate("/login");
        }   
        
    return(
    <div className="main">
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
            <h4 className="video-title">{videoDetails?.title}</h4>
            <small className="text-bold">{videoDetails?.views} views</small>
            <small className="px-2 text-bold">{videoDetails?.uploaded} months ago</small>
            </div>
            <div className="margin-left-auto feat-handler">
                {isVideoInLikedVideo(videoId, LikedVideos)?<span><i className="fa fa-thumbs-up px-2" onClick={LikedVideoHandler}></i>Liked</span>:<span><i class="far fa-thumbs-up px-2" onClick={LikedVideoHandler}></i>Like</span>}
                {isVideoInWatchLater(videoId, watchLaterList)?<span><i className="fa fa-clock px-2" onClick={watchLaterHandler}></i>Remove from Watchlater</span>:<span><i class="far fa-clock px-2" onClick={watchLaterHandler}></i>Add to Watchlater</span>}
                <span><i className="fa fa-plus-square px-2" onClick={playlistModal}></i>Add to Playlist</span>
            </div>
        </div>
        <div className="flex">
            <img className="img-round avatar-lg" src={videoDetails?.logo} alt="creator-logo"/>
            <div className="flex center-flex flex-direction-col px-2">
            <h6>{videoDetails?.creator}</h6>
            </div>
            </div>
        <p>{videoDetails?.description}</p>

        {Modal && <PlaylistModal />}
    </div>
    </div>
    )
}