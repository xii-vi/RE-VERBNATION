import "./videoCard.css"
import "../../style/layout.css"
import { Link } from "react-router-dom"
export const VideoCard =({singleVideoCard : data})=>{
    return(
        <div className="videoCard p-1">
            <Link to={`/video/${data._id}`}>
                <img className="img-responsive" src={data.creatorImage} alt="creator-img"/>
            </Link>
            <div className="p-4">
            <div className="videoCardTitle">
                <div className="h5 py-2">{data.title}</div>
                <p>{data.creator}</p>
            </div>
            <div className="flex">
            <p><small>{data.duration}</small></p>
            <p className="margin-left-auto">{data.uploaded} months ago</p>
            </div>
            </div>
        </div>
    )
}