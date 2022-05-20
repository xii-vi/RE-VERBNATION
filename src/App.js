import { Navbar,Sidebar,RequireAuth, Footer } from "./components";
import { History,Homepage,ErrorPage,LikedVideo,Login,Playlist,PlaylistVideo,Signup,SingleVideo,WatchLater } from "./pages";
import { useTheme } from "./context/themeContext"
import "./style/main.css"
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ScrollToTop} from "./utilities/helper/scrollToTop"
function App() {
  const { theme } = useTheme();
  return (
    <div className= {theme === "light" ? "light" : "dark"}>
    <ScrollToTop />
    <ToastContainer
          position='top-right'
          autoClose={1500}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          limit={5}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
    <Navbar />
    <div className="app-layout">
    <Sidebar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/video/:videoId" element={<SingleVideo />} />
      <Route element={<RequireAuth />}>
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/likedvideo" element={<LikedVideo />} />
      <Route path="/history" element={<History />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/playlist/:playlistId" element={<PlaylistVideo />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </div>
    <Footer />
    </div>
  );
}

export default App;
