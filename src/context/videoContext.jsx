import { useContext,createContext,useReducer,useState,useEffect } from "react";
import { getVideosDataFromServer , getCategoriesDataFromServer } from "../utilities/apis/apis";

const VideoContext = createContext();

const VideoProvider =({children})=>{
const [videoData,setVideoData] = useState([])
const [categoryData,setCategoryData] =  useState([])
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
        <VideoContext.Provider value=
        {{ videoData ,
            setVideoData,
            categoryData,
            setCategoryData}
        }>
            {children}
        </VideoContext.Provider>
    )
}

const useVideo =()=> useContext(VideoContext);

export {useVideo,VideoProvider}