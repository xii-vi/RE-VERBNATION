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

export {getVideosDataFromServer,getCategoriesDataFromServer}