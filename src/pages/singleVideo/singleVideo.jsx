import { useParams } from "react-router-dom"
import { useVideo } from "../../context/videoContext"
import "./singleVideo.css"
export const SingleVideo =()=>{
    const {videoData} = useVideo()
    const {videoId} = useParams()
    const videoDetails = videoData?.find(({ _id }) => _id === videoId)
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
                <i className="fa fa-thumbs-up px-2"></i>
                <i className="fa fa-clock px-2"></i>
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