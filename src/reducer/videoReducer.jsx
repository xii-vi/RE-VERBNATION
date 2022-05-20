export const VideoReducer = (state, {type,payload}) => {
    switch(type) {
        case "FILTER_BY_SEARCH":
            return { 
                ...state, 
                searchQuery: payload 
            }
        case "FILTER_BY_CATEGORY":
            return { 
                ...state, 
                category: payload 
            }
        case "ADD_WATCH_LATER":
            return {
                ...state,
                watchLaterList: payload
            }
        case "ADD_LIKEDVIDEO":
            return{
                ...state,
                LikedVideos: payload
            }
        case "ADD_HISTORY":
            return{
                ...state,
                History: payload
            }
        case "REMOVE_VIDEO_FROM_HISTORY":
            return{
                ...state,
                History: payload
            }
        case "CLEAR_HISTORY":
            return{
                ...state,
                History: payload
            }
        case "CREATE_PLAYLIST":
            return{
                ...state,
                Playlist: payload
            }
        case "ADD_VIDEO_TO_PLAYLIST":
            return {
                ...state, Playlist: state.Playlist.map((playlist) =>
                    playlist._id === payload.playlistId
                        ? { ...playlist, videos: [...playlist.videos, payload.video] } : playlist)
            }
        case "REMOVE_PLAYLIST":
                return{
                    ...state,
                    Playlist: payload
                }
        case "REMOVE_VIDEO_FROM_PLAYLIST":
            return {
                ...state, Playlist: state.Playlist.map((playlist) =>
                    playlist._id === payload.playlistId ? { ...playlist, videos: playlist.videos.filter((video) => video._id !== payload.videoId), } : playlist)
            }        
        default:
        return state;
    }
}