import axios from 'axios';
import { toast } from "react-toastify";

const getVideosDataFromServer = async () => {
    try {
        const response = await axios.get('/api/videos');
        return response.data.videos;
    } catch(error) {
        console.log(error);
    }
}
const getCategoriesDataFromServer = async ()=>{
    try {
        const response = await axios.get('/api/categories');
        return response.data.categories;
    }
    catch(error){
        console.log(error)
    }
}

const getLoginDataFromServer = async (email,password)=>{
    try {
        const loginResponse = await axios.post("api/auth/login", {email,password});
        return loginResponse
    }
    catch(error){
        console.log(error);
    }
}

const addVideoInWatchLater = async (video, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.post("/api/user/watchlater",{video}, {
            headers: {
                authorization:  token
            }
        },)
        VideoDispatch({
            type: "ADD_WATCH_LATER",
            payload: data.watchlater
        })
        toast.success(<small>Video added to WatchLater.</small>)
    } catch (error) {
        toast.error(<small>Video not added to WatchLater.</small>)
    }
}

const removeVideoFromWatchLater = async (videoId, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.delete(`/api/user/watchlater/${videoId}`, {
            headers: {
                authorization:  token
            }
        })
        VideoDispatch({
            type: "ADD_WATCH_LATER",
            payload: data.watchlater
        })
        toast.success(<small>Video removed from WatchLater.</small>)
    } catch (error) {
        toast.error(<small>Video not removed from WatchLater.</small>)
    }
}

const addVideoInLikedVideo = async (video, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.post("/api/user/likes",{video}, {
            headers: {
                authorization:  token
            }
        },)
        VideoDispatch({
            type: "ADD_LIKEDVIDEO",
            payload: data.likes
        })
        toast.success(<small>Video Liked.</small>)
    } catch (error) {
        toast.error(<small>Video not Liked.</small>)
    }
}

const removeVideoFromLikedVideo = async (videoId, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.delete(`/api/user/likes/${videoId}`, {
            headers: {
                authorization:  token
            }
        })
        VideoDispatch({
            type: "ADD_LIKEDVIDEO",
            payload: data.likes
        })
        toast.success(<small>Video Disliked.</small>)
    } catch (error) {
        toast.error(<small>Video not Disliked.</small>)
    }
}

const addVideoInHistory = async (video, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.post("/api/user/history",{video}, {
            headers: {
                authorization:  token
            }
        },)
        VideoDispatch({
            type: "ADD_HISTORY",
            payload: data.history
        })
    } catch (error) {
        console.log(error);
    }
}

const removeVideoFromHistory = async (videoId, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.delete(`/api/user/history/${videoId}`, {
            headers: {
                authorization:  token
            }
        })
        VideoDispatch({
            type: "REMOVE_VIDEO_FROM_HISTORY",
            payload: data.history
        })
        toast.success(<small>Video Removed.</small>)
    } catch (error) {
        toast.error(<small>Video not Removed.</small>)
    }
}

const removeAllVideoFromHistory = async (VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.delete(`/api/user/history/all`, {
            headers: {
                authorization:  token
            }
        })
        VideoDispatch({
            type: "CLEAR_HISTORY",
            payload: data.history
        })
        toast.success(<small>History Cleared.</small>)
    } catch (error) {
        toast.error(<small>History Not Cleared.</small>)
    }
}

const createPlaylist = async (playlistTitle, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.post("/api/user/playlists",{playlist:{
            title:playlistTitle
        }}, {
            headers: {
                authorization:  token
            }
        },)
        VideoDispatch({
            type: "CREATE_PLAYLIST",
            payload: data.playlists
        })
        toast.success(<small>Playlist Created.</small>)
    } catch (error) {
        toast.error(<small>Playlist Not Created.</small>)
    }
}
const addVideoToPlaylist = async (video,playlistId, VideoDispatch, token) => {
    try {
        await axios.post(`/api/user/playlists/${playlistId}`,{video}, {
            headers: {
                authorization:  token
            }
        },)
        VideoDispatch({
            type: "ADD_VIDEO_TO_PLAYLIST",
            payload: {video, playlistId}
        })
        toast.success(<small>Video Added To Playlist.</small>)
    } catch (error) {
        toast.error(<small>Video Not Added To Playlist.</small>)
    }
}

const removePlaylist = async (playlistId, VideoDispatch, token) => {
    try {
        const {
            data
        } = await axios.delete(`/api/user/playlists/${playlistId}`, {
            headers: {
                authorization:  token
            }
        })
        VideoDispatch({
            type: "REMOVE_PLAYLIST",
            payload: data.playlists
        })
        toast.success(<small>Playlist Removed.</small>)
    } catch (error) {
        toast.error(<small>Playlist Not Removed.</small>)
    }
}

const removeVideoFromPlaylist = async (videoId, VideoDispatch, encodedToken, playlistId) => {
    try {
        await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, {
            headers: { authorization: encodedToken }
        })
        VideoDispatch({ 
            type: "REMOVE_VIDEO_FROM_PLAYLIST", 
            payload: { videoId, playlistId } 
        })
        toast.success(<small>Video Removed From Playlist.</small>)
    } catch (error) {
        toast.error(<small>Video Not Removed From Playlist.</small>)
    }
}

export {
    getVideosDataFromServer,
    getCategoriesDataFromServer,
    getLoginDataFromServer,
    removeVideoFromWatchLater,
    addVideoInWatchLater,
    addVideoInLikedVideo,
    removeVideoFromLikedVideo,
    addVideoInHistory,
    removeVideoFromHistory,
    removeAllVideoFromHistory,
    createPlaylist,
    addVideoToPlaylist,
    removePlaylist,
    removeVideoFromPlaylist
}