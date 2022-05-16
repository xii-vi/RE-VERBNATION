import { Navbar } from "./components/navbar/navbar";
import { Homepage,Login } from "./pages";
import { useTheme } from "./context/themeContext"
import "./style/main.css"
import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/auth/signup";
import { Sidebar } from "./components/sidebar/sidebar";
import { SingleVideo } from "./pages/singleVideo/singleVideo";
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
    </Routes>
    </div>
    </div>
  );
}

export default App;
