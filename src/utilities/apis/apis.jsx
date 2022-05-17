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

const getWatchLaterFromServer = async (watchLaterDispatch,token)=>{
    try {
        const {
            data
        } = await axios.get("/api/user/watchlater",{
            headers: {
                authorization: token
            }
        })
        watchLaterDispatch({
            type: "ADD_WATCHLATER",
            payload: data.watchlater
        })
    } catch (error) {
        console.log(error);
    }
}

const addVideoInWatchLater = async (video, watchLaterDispatch, token) => {
    try {
        const {
            data
        } = await axios.post("/api/user/watchlater",{video}, {
            headers: {
                authorization:  token
            }
        },)
        watchLaterDispatch({
            type: "ADD_WATCH_LATER",
            payload: data.watchlater
        })
    } catch (error) {
        console.log(error);
    }
}

const removeVideoFromWatchLater = async (videoId, watchLaterDispatch, token) => {
    try {
        const {
            data
        } = await axios.delete(`/api/user/watchlater/${videoId}`, {
            headers: {
                authorization:  token
            }
        })
        watchLaterDispatch({
            type: "ADD_WATCH_LATER",
            payload: data.watchlater
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
    addVideoInWatchLater
}