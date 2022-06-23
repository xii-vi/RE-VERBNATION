import "./playlistModal.css"
import { useDispatch, useSelector } from "react-redux";
import { useState} from "react";
import { addVideoToPlaylist, createPlaylist, removeVideoFromPlaylist,setIsModalOpen,setIsLoader} from "../../pages/playlist/playlistSlice";
import { isVideoInPlaylist } from "../../utilities/helper/videoFunctions";
import { LoadSpin } from "../loader/loader";
import { toast } from "react-toastify";
export const PlaylistModal = ({playlistVideo : data})=>{
    const[playlistTitle,setPlaylistTitle]=useState("");
    const {isModalOpen,isLoader,Playlist} = useSelector(store=>store.playlist)
    const dispatch = useDispatch();

    const inputData =(e)=>{
        if(e.target.value !== "")
        setPlaylistTitle(e.target.value)
    }
    const createPlaylistName=()=>{
        dispatch(createPlaylist(playlistTitle))
        setPlaylistTitle("")
    }
    const addVideo =(_id,data)=>{
        if(!isVideoInPlaylist(Playlist, _id, data._id))
        {
        dispatch(setIsLoader(true));
        dispatch(addVideoToPlaylist({id:_id,video:data})).unwrap().then((res) => toast.success("Video added to the playlist!"))
        .catch((error) => toast.error(error));
        setTimeout(() => { dispatch(setIsLoader(false)); }, 1200);
        }
        else{
        dispatch(setIsLoader(true));
        dispatch(removeVideoFromPlaylist({playlistId:_id,videoId:data._id})).unwrap().then((res) => toast.success("Video removed from the playlist!"))
        .catch((error) => toast.error(error));
        setTimeout(() => { dispatch(setIsLoader(false)); }, 1200);
        }
    }
    return(
    <div className="modal-background">
        <div className="modal-container flex center-flex">
            <div className="model-content p-4">
            <div className="p-2">
                <div className="h6 text-bold">Add to an existing playlist <span className="text-align-right pl-3"><i class="far fa-times-circle" onClick={()=>isModalOpen?dispatch(setIsModalOpen(false)):dispatch(setIsModalOpen(true))}></i></span></div>
                {isLoader?<LoadSpin />:  
                <div className="flex flex-direction-col py-2">
                    {(Playlist.length===0)?<div></div>:
                    Playlist.map(({title,_id})=>{
                    return(
                    <label key={_id}>
                        <input type="checkbox" id= { _id} value={title} checked={isVideoInPlaylist(Playlist, _id, data._id) ?? false} onChange={()=>addVideo(_id,data)} />
                        <span className="px-2">{title}</span>
                    </label>
                    )})}
                </div>
            }
            </div>
            <hr />
            <div className="p-2">
                <h6>Create new playlist</h6>
                <div className="py-4">
                    <input className="p-2 mr-5" type="text" placeholder="Enter Playlist Name" value={playlistTitle} onChange={(e)=>inputData(e)}/>
                    <button className="btn btn-primary ml-5" onClick={createPlaylistName}>Add</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}