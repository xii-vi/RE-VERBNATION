import "./videoCard.css"
import "../../style/layout.css"
import { Link } from "react-router-dom"
export const VideoCard =({singleVideoCard : data})=>{
    return(
        <div className="videoCard p-1">
            <Link to={`/video/${data._id}`}>
                <img className="img-responsive" src={data.creatorImage} alt="creator-img"/>
            </Link>
            <div className="py-2">
            <div className="videoCardTitle">
                <div className="py-2">{data.title}</div>
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