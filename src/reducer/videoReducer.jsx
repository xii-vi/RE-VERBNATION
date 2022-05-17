export const VideoReducer = (state, action) => {
    switch(action.type) {
        case "ADD_WATCH_LATER":
        return {
            ...state,
            watchLaterList: action.payload
        }
        case "ADD_LIKEDVIDEO":
            return{
                ...state,
                LikedVideos: action.payload
            }
        case "ADD_HISTORY":
            return{
                ...state,
                History: action.payload
            }
        default:
        return state;
    }
}