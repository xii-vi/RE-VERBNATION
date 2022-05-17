import axios from 'axios';
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

const getWatchLaterFromServer = async (VideoDispatch,token)=>{
    try {
        const {
            data
        } = await axios.get("/api/user/watchlater",{
            headers: {
                authorization: token
            }
        })
        VideoDispatch({
            type: "ADD_WATCHLATER",
            payload: data.watchlater
        })
    } catch (error) {
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
    } catch (error) {
        console.log(error);
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
    } catch (error) {
        console.log(error);
    }
}

const getLikedVideoFromServer = async (VideoDispatch,token)=>{
    try {
        const {
            data
        } = await axios.get("/api/user/likes",{
            headers: {
                authorization: token
            }
        })
            VideoDispatch({
            type: "ADD_LIKEDVIDEO",
            payload: data.likes
        })
    } catch (error) {
        console.log(error);
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
    } catch (error) {
        console.log(error);
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
    } catch (error) {
        console.log(error);
    }
}
const getHistoryFromServer = async (VideoDispatch,token)=>{
    try {
        const {
            data
        } = await axios.get("/api/user/history",{
            headers: {
                authorization: token
            }
        })
            VideoDispatch({
            type: "ADD_HISTORY",
            payload: data.history
        })
    } catch (error) {
        console.log(error);
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
            type: "ADD_HISTORY",
            payload: data.history
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    getVideosDataFromServer,
    getCategoriesDataFromServer,
    getLoginDataFromServer,
    getWatchLaterFromServer,
    removeVideoFromWatchLater,
    addVideoInWatchLater,
    getLikedVideoFromServer,
    addVideoInLikedVideo,
    removeVideoFromLikedVideo,
    getHistoryFromServer,
    addVideoInHistory,
    removeVideoFromHistory
}