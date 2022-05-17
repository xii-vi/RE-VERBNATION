import { Navbar,Sidebar,RequireAuth } from "./components";
import { History,Homepage,LikedVideo,Login,Signup,SingleVideo,WatchLater } from "./pages";
import { useTheme } from "./context/themeContext"
import "./style/main.css"
import { Routes, Route } from "react-router-dom";
function App() {
  const { theme } = useTheme();
  return (
    <div className= {theme === "light" ? "light" : "dark"}>
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
      </Route>
    </Routes>
    </div>
    </div>
  );
}

export default App;
