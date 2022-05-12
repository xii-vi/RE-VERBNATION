import "./videoCard.css"
import "../../style/layout.css"
export const VideoCard =({singleVideoCard : data})=>{
    return(
        <div className="videoCard p-1">
            <img className="img-responsive" src={data.creatorImage} />
            <div className="p-4">
            <div className="videoCardTitle">
                <p className="h5 py-2">{data.title}</p>
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