import { useState, createContext, useContext,useEffect } from "react"
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    localStorage.getItem("themeSeter") === "light" ? setTheme("light") : setTheme("dark");
  }, []);
  const toggleTheme = () =>
  localStorage.getItem("themeSeter") === "light" ? (setTheme("dark"),localStorage.setItem("themeSeter",'dark') ): (setTheme("light"),localStorage.setItem("themeSeter",'light'));
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };