import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    videos: [],
    categories: [],
    LikedVideos: [],
    WatchLater: [],
    History:[],
    searchQuery: "",
    category: "All",
    isLoading: false,

};

export const getVideosDataFromServer = createAsyncThunk(
    "videos/getVideosDataFromServer",
    async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/videos");
        return response.data;
    } catch(error) {
        return rejectWithValue("Cannot display videos right now!");
    }
    }
);

export const getCategoriesDataFromServer = createAsyncThunk(
    "videos/getCategoriesDataFromServer",
    async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/categories");
        return response.data;
    } catch(error) {
        return rejectWithValue(
        "Cannot display categories right now. Please try later!"
        );
    }
    }
);

export const addVideoInLikedVideo = createAsyncThunk("likedvideo/addVideoInLikedVideo",
async (video, { rejectWithValue }) => {
    try {
    const response = await axios.post(
        "/api/user/likes",
        { video },
        {
        headers: {
            authorization: localStorage.getItem("loginToken"),
        },
        }
    );
    return response.data;
    } catch (error) {
    return rejectWithValue("Cannot add to liked videos right now!");
    }
});

export const removeVideoFromLikedVideo = createAsyncThunk(
    "likedVideo/removeVideoFromLikedVideo",
    async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/user/likes/${id}`, {
        headers: {
            authorization: localStorage.getItem("loginToken"),
        },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue("Cannot delete from liked video right now!");
    }
    }
);

export const addVideoInWatchLater = createAsyncThunk("watchlater/addVideoInWatchLater",
async(video,{rejectWithValue})=>{
    try {
        const response = await axios.post("/api/user/watchlater",{video},{
        headers: {
            authorization: localStorage.getItem("loginToken"),
        }});
        return response.data;
    } catch (error) {
    return rejectWithValue("Cannot add to watch later right now!");
    }
})

export const removeVideoFromWatchLater = createAsyncThunk("watchlater/removeVideoFromWatchLater",
async(id,{rejectWithValue})=>{
    try {
        const response = await axios.delete(`/api/user/watchlater/${id}`,{
        headers: {
            authorization: localStorage.getItem("loginToken"),
        }});
        return response.data;
    } catch (error) {
    return rejectWithValue("Cannot remove from watch later right now!");
    }
})

export const addVideoInHistory = createAsyncThunk("history/addVideoInHistory",
async(video,{rejectWithValue})=>{
    try {
        const response = await axios.post("/api/user/history",{video},{
        headers: {
            authorization: localStorage.getItem("loginToken"),
        }});
        return response.data;
    } catch (error) {
    return rejectWithValue("Cannot add to history right now!");
    }
})

export const removeVideoFromHistory = createAsyncThunk("history/removeVideoFromHistory",
async(id,{rejectWithValue})=>{
    try {
        const response = await axios.delete(`/api/user/history/${id}`,{
        headers: {
            authorization: localStorage.getItem("loginToken"),
        }});
        return response.data;
    } catch (error) {
    return rejectWithValue("Cannot remove from history right now!");
    }
})

export const removeAllVideoFromHistory = createAsyncThunk("history/removeAllVideoFromHistory",
async(_,{rejectWithValue})=>{
    try {
        const response = await axios.delete(`/api/user/history/all`,{
        headers: {
            authorization: localStorage.getItem("loginToken"),
        }});
        return response.data;
    } catch (error) {
    return rejectWithValue("Cannot remove from history right now!");
    }
})



const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
    setCurrentCategory: (state, { payload }) => {
        state.category = payload;
    },
    setSearchQuery: (state, { payload }) => {
        state.searchQuery = payload;
    },
    },
    extraReducers: {
    [getVideosDataFromServer.pending]: (state) => {
        state.isLoading = true;
    },
    [getVideosDataFromServer.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.videos = payload.videos;
    },
    [getVideosDataFromServer.rejected]: (state) => {
        state.isLoading = false;
    },
    [getCategoriesDataFromServer.pending]: (state) => {
        state.isLoading = true;
    },
    [getCategoriesDataFromServer.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload.categories;
    },
    [getCategoriesDataFromServer.rejected]: (state) => {
        state.isLoading = false;
    },
    [addVideoInLikedVideo.pending]: (state) => {
        state.isLoading = true;
    },
    [addVideoInLikedVideo.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.LikedVideos = payload.likes.reverse();
    },
    [addVideoInLikedVideo.rejected]: (state) => {
        state.isLoading = false;
    },
    [removeVideoFromLikedVideo.pending]: (state) => {
        state.isLoading = true;
    },
    [removeVideoFromLikedVideo.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.LikedVideos = payload.likes;
    },
    [removeVideoFromLikedVideo.rejected]: (state) => {
        state.isLoading = false;
    },
    [addVideoInWatchLater.pending]: (state) => {
        state.isLoading = true;
    },
    [addVideoInWatchLater.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.WatchLater = payload.watchlater.reverse();
    },
    [addVideoInWatchLater.rejected]: (state) => {
        state.isLoading = false;
    },
    [removeVideoFromWatchLater.pending]: (state) => {
        state.isLoading = true;
    },
    [removeVideoFromWatchLater.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.WatchLater = payload.watchlater;
    },
    [removeVideoFromWatchLater.rejected]: (state) => {
        state.isLoading = false;
    },
    [addVideoInHistory.pending]: (state) => {
        state.isLoading = true;
    },
    [addVideoInHistory.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.History = payload.history;
    },
    [addVideoInHistory.rejected]: (state) => {
        state.isLoading = false;
    },
    [removeVideoFromHistory.pending]: (state) => {
        state.isLoading = true;
    },
    [removeVideoFromHistory.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.History = payload.history;
    },
    [removeVideoFromHistory.rejected]: (state) => {
        state.isLoading = false;
    },
    [removeAllVideoFromHistory.pending]: (state) => {
        state.isLoading = true;
    },
    [removeAllVideoFromHistory.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.History = payload.history;
    },
    [removeAllVideoFromHistory.rejected]: (state) => {
        state.isLoading = false;
    },
    }
}
)

export const { setCurrentCategory, setSearchQuery } =
videoSlice.actions;
export default videoSlice.reducer;