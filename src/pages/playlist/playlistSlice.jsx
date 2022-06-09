import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    Playlist:[],
    isLoading: false,
    isModalOpen: false,
    isLoader:false,
}

export const createPlaylist = createAsyncThunk("playlist/createPlaylist",
async(playlistTitle,{ rejectWithValue })=>{
    try{
        const response = await axios.post("/api/user/playlists",{playlist:{
            title:playlistTitle
        }},{
            headers: {
                authorization: localStorage.getItem("loginToken"),
            },
            })
    return response.data;
} catch (error) {
    return rejectWithValue("Cannot create Playlist right now!");
    }
});

export const addVideoToPlaylist = createAsyncThunk("playlist/addVideoToPlaylist",
async({id,video}, { rejectWithValue })=>{
    try{
        const response = await axios.post(`/api/user/playlists/${id}`,{video},{
            headers: {
                authorization: localStorage.getItem("loginToken"),
            },
            })
    return response.data;
} catch (error) {
    return rejectWithValue("Cannot add video to the Playlist right now!");
    }
});

export const removeVideoFromPlaylist = createAsyncThunk("playlist/removeVideoFromPlaylist",
async({videoId,playlistId}, { rejectWithValue })=>{
    try{
        const response = await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`,{
            headers: {
                authorization: localStorage.getItem("loginToken"),
            },
            })
    return response.data;
} catch (error) {
    return rejectWithValue("Cannot remove video from Playlist right now!");
    }
});

export const removePlaylist = createAsyncThunk("playlist/removePlaylist",
async(playlistId, { rejectWithValue })=>{
    try{
        const response = await axios.delete(`/api/user/playlists/${playlistId}`,{
            headers: {
                authorization: localStorage.getItem("loginToken"),
            },
            })
    return response.data;
} catch (error) {
    return rejectWithValue("Cannot remove Playlist right now!");
    }
});


const playlistSlice = createSlice({
    name:"playlist",
    initialState,
    reducers:{
        setIsModalOpen: (state, { payload }) => {
            state.isModalOpen = payload;
        },
        setIsLoader:(state,{ payload }) => {
            state.isLoader = payload;
        },
    },
    extraReducers:{
        [createPlaylist.rejected]: (state) => {
            state.isLoading = false;
        },
        [createPlaylist.pending]: (state) => {
            state.isLoading = true;
        },
        [createPlaylist.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.Playlist = payload.playlists;
        },
        [removePlaylist.pending]: (state) => {
            state.isLoading = true;
        },
        [removePlaylist.rejected]: (state) => {
            state.isLoading = false;
        },
        [removePlaylist.fulfilled]: (state, { payload }) => {
            state.Playlist = payload.playlists;
            state.isLoading = false;
        },
        [addVideoToPlaylist.rejected]: (state) => {
            state.isLoading = false;
        },
        [addVideoToPlaylist.pending]: (state) => {
            state.isLoading = true;
        },
        [addVideoToPlaylist.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.Playlist = state.Playlist.map((playlist) =>
            playlist._id === payload.playlist._id
                ?  payload.playlist : playlist)
        },
        [removeVideoFromPlaylist.rejected]: (state) => {
            state.isLoading = false;
        },
        [removeVideoFromPlaylist.pending]: (state) => {
            state.isLoading = true;
        },
        [removeVideoFromPlaylist.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.Playlist = state.Playlist.map((playlist) =>
            playlist._id === payload.playlist._id
                ? payload.playlist
                : playlist
            );
        },
    }
})

export const { setIsModalOpen,setIsLoader } = playlistSlice.actions;
export default playlistSlice.reducer;