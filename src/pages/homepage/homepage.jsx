import "../../style/layout.css"
import noVideoFound from "../../assest/noVideoFound.svg"
import { ExploreVideoCard,LoadSpin } from "../../components"
import { filterFunction } from "../../utilities/helper/filterFunctions"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { getVideosDataFromServer,getCategoriesDataFromServer,setCurrentCategory,setSearchQuery } from "./videoSlice"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoader } from "../playlist/playlistSlice"
import { useState } from "react"
import { PlaylistModal } from "../../components/playlist/playlistModal"
export const Homepage = ()=>{
    const dispatch = useDispatch();
    const [btnClicked,setBtnClicked] = useState(false)
    const [currentVideoData,setCurrentVideoData] = useState(null)
    const { videos, categories, category, searchQuery } = useSelector(store=>store.video)
    const {isLoader,isModalOpen} = useSelector(store=>store.playlist)
    useEffect(() => {
        dispatch(setIsLoader(true))
        const data = dispatch(getVideosDataFromServer());
        data.unwrap().catch((error) => toast.error(error));
        setTimeout(() => { dispatch(setIsLoader(false)) }, 300);
    }, [dispatch]);

    useEffect(() => {
        const data = dispatch(getCategoriesDataFromServer());
        data.unwrap().catch((error) => toast.error(error));
    }, [dispatch]);

    useEffect(() => {
        const categoryName = category;
        dispatch(setCurrentCategory(categoryName));
    }, [category, dispatch]);
    
    const filteredVideo = filterFunction(videos, searchQuery, category)

    return(<>
    {
    isLoader?<LoadSpin />:
    filteredVideo.length <= 0?
        <div className='text-center p-4 main'>
        <div className="m-2">
            <div className="search-bar-wrapper-sm flex p-2">
            <input type="text" placeholder="🔍 Search for Videos" value={searchQuery} onChange={(e) => dispatch(setSearchQuery((e.target.value)))}/>
            </div>
            </div>
    <img className="img-responsive error-page-img" src={noVideoFound} alt="error-page" />
    <h3 className='py-2'>No video found</h3>
        </div>
        :<div className="main p-4">
            <div className="m-2">
            <div className="search-bar-wrapper-sm flex p-2">
            <input type="text" placeholder="🔍 Search for Videos" value={searchQuery} onChange={(e) => dispatch(setSearchQuery(e.target.value))}/>
            </div>
            </div>
            <div className="flex">
                <span className={btnClicked==="All"?"btn btn-secondary m-2 btn-clicked":"btn btn-primary m-2"} onClick={(e) =>{
                    setBtnClicked(e.target.innerText)
                    dispatch(setCurrentCategory(e.target.innerText))
                }}>All</span>

                {categories.map(item=><span className={btnClicked===item.categoryName?"btn btn-secondary m-2 btn-clicked":"btn btn-primary m-2"} key={item._id} onClick={(e) => {
                    setBtnClicked(e.target.innerText)
                    dispatch(setCurrentCategory(e.target.innerText))}}>{item.categoryName}</span>)}

            </div>
        <div className="main-display">
            {filteredVideo.map(item=><ExploreVideoCard singleVideoCard={item}  setCurrentClickedVideo={setCurrentVideoData} key={item._id}/>)}
        </div>
        {isModalOpen && <PlaylistModal playlistVideo={currentVideoData}/>}
        </div>
        }
        </>
    )
}