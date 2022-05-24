import { useContext,createContext,useState,useEffect,useReducer } from "react";
import { getVideosDataFromServer , getCategoriesDataFromServer } from "../utilities/apis/apis";
import {VideoReducer} from "../reducer/videoReducer";
const VideoContext = createContext();

const VideoProvider =({children})=>{
const [isLoading, setIsLoading] = useState(false)
const [Modal,setModal]=useState(false)
const [videoData,setVideoData] = useState([])
const [categoryData,setCategoryData] =  useState([])
const [VideoState, VideoDispatch] = useReducer(VideoReducer, {
    watchLaterList: [],
    LikedVideos: [],
    History:[],
    Playlist:[],
    searchQuery: "",
    category: "All",
})
useEffect(()=>{
    (async () => {
        const data = await getVideosDataFromServer();
        setVideoData(data)
    })() 
},[])
useEffect(()=>{
    (async () => {
        const data = await getCategoriesDataFromServer();
        setCategoryData(data)
    })()
},[])
    return(
        <VideoContext.Provider value =
        {{ videoData ,
            setVideoData,
            categoryData,
            setCategoryData,
            VideoState,
            VideoDispatch,
            Modal,
            setModal,
            isLoading,
            setIsLoading
        }
        }>
            {children}
        </VideoContext.Provider>
    )
}

const useVideo =()=> useContext(VideoContext);

export {useVideo,VideoProvider}