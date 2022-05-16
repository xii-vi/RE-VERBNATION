import { Navbar } from "./components/navbar/navbar";
import { Homepage,Login } from "./pages";
import { useTheme } from "./context/themeContext"
import "./style/main.css"
import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/auth/signup";
function App() {
  const { theme } = useTheme();
  return (
    <div className= {theme === "light" ? "light" : "dark"}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </div>
  );
}

export default App;
