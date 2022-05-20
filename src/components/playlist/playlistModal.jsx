import "./playlistModal.css"
import { useAuth } from "../../context/authContext";
import { useVideo } from "../../context/videoContext";
import { useParams} from "react-router-dom";
import { useState } from "react";
import { addVideoToPlaylist, createPlaylist } from "../../utilities/apis/apis";
import { isVideoInPlaylist } from "../../utilities/helper/videoFunctions";
export const PlaylistModal = ()=>{
    const[playlistTitle,setPlaylistTitle]=useState("");
    const { authState: { encodedToken }} = useAuth();
    const {videoId} = useParams();
    const {videoData,VideoState:{Playlist}, VideoDispatch,Modal,setModal} = useVideo()
    const videoDetails = videoData?.find(({ _id }) => _id === videoId)

    const inputData =(e)=>{
        if(e.target.value !== "")
        setPlaylistTitle(e.target.value)
    }
    const createPlaylistName=()=>{
        createPlaylist(playlistTitle,VideoDispatch,encodedToken)
        setPlaylistTitle("")
    }
    const addVideo =(e,_id)=>{
        if(e.target.checked)
        addVideoToPlaylist(videoDetails, _id ,VideoDispatch,encodedToken)
    }
    return(
    <div className="modal-background">
        <div className="modal-container flex center-flex">
            <div className="model-content p-4">
            <div className="p-2">
                <div className="h6 text-bold">Add to an existing playlist <span className="text-align-right pl-3"><i class="far fa-times-circle" onClick={()=>Modal?setModal(false):setModal(true)}></i></span></div>
                
                <div className="flex flex-direction-col">
                    {(Playlist.length===0)?<div></div>:
                    Playlist.map(({title,_id})=>{
                    return(
                    <label>
                        <input type="checkbox" id= { _id } onClick={(e)=>addVideo(e,_id)} checked={isVideoInPlaylist(Playlist, _id, videoDetails._id) ?? false}/>
                        <span className="px-2">{title}</span>
                    </label>
                    )})}
                </div>
            </div>
            <hr />
            <div className="p-2">
                <h6>Create new playlist</h6>
                <div className="py-4">
                    <input className="p-2" type="text" placeholder="Enter Playlist Name" value={playlistTitle} onChange={(e)=>inputData(e)}/>
                    <button className="btn btn-primary" onClick={createPlaylistName}>Add</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}