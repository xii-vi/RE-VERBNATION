import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { VideoProvider } from "./context/videoContext";
import { ThemeProvider } from "./context/themeContext";
const root = createRoot(document.getElementById("root"));

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
    <ThemeProvider>
    <VideoProvider>
    <App />
    </VideoProvider>
  </ThemeProvider>
  </React.StrictMode>,
);
