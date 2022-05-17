import { useContext,createContext,useState,useEffect,useReducer } from "react";
import { getVideosDataFromServer , getCategoriesDataFromServer } from "../utilities/apis/apis";
import {watchLaterReducer} from "../reducer/watchLaterReducer";
const VideoContext = createContext();

const VideoProvider =({children})=>{
const [videoData,setVideoData] = useState([])
const [categoryData,setCategoryData] =  useState([])
const [watchLaterState, watchLaterDispatch] = useReducer(watchLaterReducer, {
    watchLaterList: []
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
            watchLaterState,
            watchLaterDispatch
        }
        }>
            {children}
        </VideoContext.Provider>
    )
}

const useVideo =()=> useContext(VideoContext);

export {useVideo,VideoProvider}