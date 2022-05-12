import { Navbar } from "./components/navbar/navbar";
import { Homepage } from "./pages";
import { useTheme } from "./context/themeContext"
import "./style/main.css"

function App() {
  const { theme } = useTheme();
  return (
    <div className={theme === "light" ? "light homepage-layout" : "dark homepage-layout"}>
    <Navbar />
    <Homepage />
    </div>
  );
}

export default App;
