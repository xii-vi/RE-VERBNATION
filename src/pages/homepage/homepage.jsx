import "../../style/layout.css"
import { useVideo } from "../../context/videoContext"
import { VideoCard } from "../../components/card/videocard"
export const Homepage = ()=>{
    const { videoData,categoryData} =  useVideo()
    return(
        <div className="main">
            <div className="flex">
                <span className="btn btn-primary m-2">All</span>
                {categoryData.map(item=><span className="btn btn-primary m-2">{item.categoryName}</span>)}
            </div>
        <div className="main-display">
            {videoData.map(item=><VideoCard singleVideoCard={item} key={item._id}/>)}
        </div>
        </div>
    )
}